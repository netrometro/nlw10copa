import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

async function main() {
  const user = await Prisma.user.create({
    data: {
      name: 'Fulano de Tal',
      email: 'fulano@email.com',
      avatarUrl: 'http://github.com/netrometro.png',
    }
  })

  const pool = await Prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await Prisma.game.create({
    data: {
      date: '2022-11-02T12:00:00.201Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    }
  })

  await Prisma.game.create({
    data: {
      date: '2022-11-03T12:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participants: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })
}

main()