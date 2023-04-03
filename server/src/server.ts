import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

import { poolRoutes } from './routers/pool';
import { userRoutes } from './routers/user';
import { gameRoutes } from './routers/game';
import { guessRoutes } from './routers/guess';
import { authRoutes } from './routers/auth';


async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(jwt, {
    secret: 'nlwcopa',
  });

  await fastify.register(poolRoutes);
  await fastify.register(userRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(authRoutes);

  await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

bootstrap();