import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { ClassroomModule } from './modules/classroom/classroom.module';
import { PmpModule } from './modules/pmp/pmp.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({
      isGlobal: true, // This ensures the ConfigModule is available globally
    }),
    UserModule,
    AuthModule,
    GatewayModule,
    ClassroomModule,
    PmpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
