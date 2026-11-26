import { app } from './app';
import { prisma } from './shared/infra/database/prisma';
import { logger } from './shared/infra/observability/logger';

const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT deve ser um inteiro entre 1 e 65535.');
}

const server = app.listen(port, () => logger.info({ port }, 'API iniciada'));
server.on('error', (error) => {
  logger.fatal({ err: error }, 'Falha ao iniciar API');
  process.exitCode = 1;
});

function shutdown(signal: string): void {
  logger.info({ signal }, 'Encerrando API');
  server.close(async (error) => {
    if (error) {
      logger.error({ err: error }, 'Falha ao encerrar servidor');
      process.exitCode = 1;
    }
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      logger.error({ err: disconnectError }, 'Falha ao desconectar banco');
      process.exitCode = 1;
    }
  });
}
process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));
