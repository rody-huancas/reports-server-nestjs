import { Injectable, OnModuleInit } from '@nestjs/common';
// libraries
import { PrismaClient } from '@prisma/client';
// reports
import { getHelloWorldReport, geyEmploymentLetterReport } from 'src/reports';
// services
import { PrinterService } from '../printer/printer.service';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  hello() {
    const docDefinition = getHelloWorldReport({ name: "Rody Huancas" });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  employmentLetter() {
    const docDefinition = geyEmploymentLetterReport();

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
