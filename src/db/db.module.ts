import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const dbProviders = [
  {
    provide: 'DB_CONNECT',
    useFactory: (configService: ConfigService) => ({
      uri: configService.get('MONGODB_URI'),
    }),
    inject: [ConfigService],
  },
];

@Module({
  imports: [MongooseModule.forRootAsync({ ...dbProviders[0] })],
  providers: [...dbProviders],
  exports: [...dbProviders],
})
export class DbModule {}
