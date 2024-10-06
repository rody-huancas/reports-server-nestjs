import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
// libraries
import { PrismaClient } from '@prisma/client';
// reports
import { getCountryReport, getEmploymentLetterByIdReport, getHelloWorldReport, geyEmploymentLetterReport } from 'src/reports';
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
    const docDefinition = getHelloWorldReport({ name: 'Rody Huancas' });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  employmentLetter() {
    const docDefinition = geyEmploymentLetterReport();

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with id ${employeeId} not found`);
    }

    const docDefinition = getEmploymentLetterByIdReport({
      employerName: 'Rody Huancas',
      employerPosition: 'Desarrollador Web',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Novtiq',
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async getCountries() {
    const countries = await this.countries.findMany({
      where: { local_name: { not: null } },
    });

    const docDefinition = getCountryReport({ countries });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
