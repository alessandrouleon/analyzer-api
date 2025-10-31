import { Module } from '@nestjs/common';
import { NotificationController } from './controller/notification.controller';

@Module({
  controllers: [NotificationController],
})
export class NotificationModule {}
