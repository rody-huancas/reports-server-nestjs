import { Module } from '@nestjs/common';
import { PrinterModule } from '../printer/printer.module';
import { StoreReportsService } from './store-reports.service';
import { StoreReportsController } from './store-reports.controller';

@Module({
  controllers: [StoreReportsController],
  providers: [StoreReportsService],
  imports: [PrinterModule]
})
export class StoreReportsModule {}
