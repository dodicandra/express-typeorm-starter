import {Request, Response} from 'express';
import hbs from 'handlebars';
import path from 'path';
import PuppeteerHTMLPDF from 'puppeteer-html-pdf';

import {AppDataSource} from '../data-source';
import {VoterSuperVisor} from '../entity';

export class DownloadController {
  private repository = AppDataSource.getRepository(VoterSuperVisor);

  async pdfCalonBySuperVisor(req: Request, res: Response) {
    const param = req.app.locals.supervisor_token;

    const data = await this.repository.findOne({
      where: {email: param.email, name: param.name},
      relations: {voter: true},
      select: {voter: true},
      order: {
        voter: {name: 'ASC'},
      },
    });

    const pdfData = {
      calon: data?.voter?.map((it) => ({
        name: it.name,
        kel: it.kelurahan,
        tps: it.tps,
        hp: it.hp,
      })),
      user: param.name,
    };

    const htmlPDF = new PuppeteerHTMLPDF();
    await htmlPDF.setOptions({format: 'A4', args: ['--no-sandbox']});

    const html = await htmlPDF.readFile(path.join(__dirname, '../../views/pdf.html'), 'utf8');
    const template = hbs.compile(html);
    const content = template(pdfData);

    const pdfBuffer = await htmlPDF.create(content);
    res.attachment(decodeURIComponent(`data-calon-pemilih-${param.name}.pdf`));
    return res.end(pdfBuffer);
  }
}
