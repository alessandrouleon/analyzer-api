📁 project/
├── 📁 src/
│ ├── 📁 modules/
│ │ ├── 📁 users/
│ │ │ ├── 📁 domain/
│ │ │ │ ├── 📁 entities/
│ │ │ │ │ └── 📄 user.entity.ts
│ │ │ │ ├── 📁 value-objects/
│ │ │ │ │ ├── 📄 email.vo.ts
│ │ │ │ │ ├── 📄 cpf.vo.ts
│ │ │ │ │ ├── 📄 password.vo.ts
│ │ │ │ │ └── 📄 user-role.vo.ts
│ │ │ │ ├── 📁 repositories/
│ │ │ │ │ └── 📄 user.repository.interface.ts
│ │ │ │ ├── 📁 services/
│ │ │ │ │ └── 📄 user-domain.service.ts
│ │ │ │ └── 📁 exceptions/
│ │ │ │ ├── 📄 user-not-found.exception.ts
│ │ │ │ ├── 📄 user-already-exists.exception.ts
│ │ │ │ ├── 📄 invalid-credentials.exception.ts
│ │ │ │ └── 📄 user-inactive.exception.ts
│ │ │ ├── 📁 application/
│ │ │ │ ├── 📁 use-cases/
│ │ │ │ │ ├── 📁 create-user/
│ │ │ │ │ │ ├── 📄 create-user.use-case.ts
│ │ │ │ │ │ └── 📄 create-user.use-case.spec.ts
│ │ │ │ │ ├── 📁 get-user/
│ │ │ │ │ │ ├── 📄 get-user-by-id.use-case.ts
│ │ │ │ │ │ └── 📄 get-user-by-id.use-case.spec.ts
│ │ │ │ │ ├── 📁 update-user/
│ │ │ │ │ │ ├── 📄 update-user.use-case.ts
│ │ │ │ │ │ └── 📄 update-user.use-case.spec.ts
│ │ │ │ │ ├── 📁 delete-user/
│ │ │ │ │ │ ├── 📄 delete-user.use-case.ts
│ │ │ │ │ │ └── 📄 delete-user.use-case.spec.ts
│ │ │ │ │ ├── 📁 list-users/
│ │ │ │ │ │ ├── 📄 list-users.use-case.ts
│ │ │ │ │ │ └── 📄 list-users.use-case.spec.ts
│ │ │ │ │ └── 📁 authenticate-user/
│ │ │ │ │ ├── 📄 authenticate-user.use-case.ts
│ │ │ │ │ └── 📄 authenticate-user.use-case.spec.ts
│ │ │ │ ├── 📁 dtos/
│ │ │ │ │ ├── 📄 create-user.dto.ts
│ │ │ │ │ ├── 📄 update-user.dto.ts
│ │ │ │ │ ├── 📄 user-response.dto.ts
│ │ │ │ │ ├── 📄 user-list.dto.ts
│ │ │ │ │ └── 📄 authenticate-user.dto.ts
│ │ │ │ ├── 📁 mappers/
│ │ │ │ │ └── 📄 user.mapper.ts
│ │ │ │ └── 📁 interfaces/
│ │ │ │ ├── 📄 email-service.interface.ts
│ │ │ │ └── 📄 storage-service.interface.ts
│ │ │ ├── 📁 infrastructure/
│ │ │ │ ├── 📁 persistence/
│ │ │ │ │ ├── 📁 entities/
│ │ │ │ │ │ └── 📄 user.schema.ts
│ │ │ │ │ ├── 📁 repositories/
│ │ │ │ │ │ └── 📄 user.repository.ts
│ │ │ │ │ └── 📁 migrations/
│ │ │ │ │ ├── 📄 1234567890-create-users-table.ts
│ │ │ │ │ └── 📄 1234567891-add-avatar-to-users.ts
│ │ │ │ ├── 📁 messaging/
│ │ │ │ │ ├── 📁 publishers/
│ │ │ │ │ │ └── 📄 user-events.publisher.ts
│ │ │ │ │ └── 📁 subscribers/
│ │ │ │ │ └── 📄 user-created.subscriber.ts
│ │ │ │ ├── 📁 services/
│ │ │ │ │ ├── 📄 email.service.ts
│ │ │ │ │ └── 📄 s3-storage.service.ts
│ │ │ │ └── 📁 config/
│ │ │ │ └── 📄 user.config.ts
│ │ │ ├── 📁 presentation/
│ │ │ │ ├── 📁 controllers/
│ │ │ │ │ ├── 📄 user.controller.ts
│ │ │ │ │ └── 📄 user.controller.spec.ts
│ │ │ │ ├── 📁 guards/
│ │ │ │ │ ├── 📄 user-ownership.guard.ts
│ │ │ │ │ └── 📄 admin-only.guard.ts
│ │ │ │ ├── 📁 decorators/
│ │ │ │ │ ├── 📄 current-user.decorator.ts
│ │ │ │ │ └── 📄 roles.decorator.ts
│ │ │ │ └── 📁 validators/
│ │ │ │ ├── 📄 is-strong-password.validator.ts
│ │ │ │ └── 📄 is-unique-email.validator.ts
│ │ │ └── 📄 users.module.ts
│ │ │
│ │ ├── 📁 products/
│ │ │ ├── (estrutura idêntica à dos users, com arquivos de domínio, casos de uso, infraestrutura e apresentação)
│ │ │ └── 📄 products.module.ts
│ │
│ ├── 📁 shared/
│ │ ├── 📁 domain/
│ │ │ ├── 📄 base.entity.ts
│ │ │ ├── 📄 value-object.base.ts
│ │ │ ├── 📄 aggregate-root.base.ts
│ │ │ └── 📄 domain-event.base.ts
│ │ ├── 📁 application/
│ │ │ ├── 📄 use-case.interface.ts
│ │ │ └── 📄 pagination.dto.ts
│ │ ├── 📁 infrastructure/
│ │ │ ├── 📁 database/
│ │ │ │ ├── 📄 database.module.ts
│ │ │ │ ├── 📄 database.config.ts
│ │ │ │ └── 📄 database.providers.ts
│ │ │ ├── 📁 cache/
│ │ │ │ ├── 📄 cache.module.ts
│ │ │ │ └── 📄 cache.service.ts
│ │ │ ├── 📁 messaging/
│ │ │ │ ├── 📄 rabbitmq.module.ts
│ │ │ │ └── 📄 event-bus.service.ts
│ │ │ ├── 📁 logging/
│ │ │ │ ├── 📄 logger.module.ts
│ │ │ │ └── 📄 logger.service.ts
│ │ │ └── 📁 config/
│ │ │ ├── 📄 env.config.ts
│ │ │ ├── 📄 jwt.config.ts
│ │ │ └── 📄 swagger.config.ts
│ │ ├── 📁 presentation/
│ │ │ ├── 📁 filters/
│ │ │ │ ├── 📄 http-exception.filter.ts
│ │ │ │ ├── 📄 domain-exception.filter.ts
│ │ │ │ └── 📄 all-exceptions.filter.ts
│ │ │ ├── 📁 interceptors/
│ │ │ │ ├── 📄 logging.interceptor.ts
│ │ │ │ ├── 📄 transform.interceptor.ts
│ │ │ │ ├── 📄 timeout.interceptor.ts
│ │ │ │ └── 📄 cache.interceptor.ts
│ │ │ ├── 📁 middlewares/
│ │ │ │ ├── 📄 correlation-id.middleware.ts
│ │ │ │ └── 📄 request-logger.middleware.ts
│ │ │ ├── 📁 guards/
│ │ │ │ ├── 📄 jwt-auth.guard.ts
│ │ │ │ ├── 📄 roles.guard.ts
│ │ │ │ └── 📄 throttle.guard.ts
│ │ │ └── 📁 pipes/
│ │ │ ├── 📄 validation.pipe.ts
│ │ │ └── 📄 parse-uuid.pipe.ts
│ │ └── 📁 utils/
│ │ ├── 📄 crypto.util.ts
│ │ ├── 📄 date.util.ts
│ │ ├── 📄 string.util.ts
│ │ └── 📄 pagination.util.ts
│ │
│ ├── 📄 app.module.ts
│ └── 📄 main.ts
│
├── 📁 test/
│ ├── 📁 unit/
│ ├── 📁 integration/
│ ├── 📁 e2e/
│ └── 📁 fixtures/
│
├── 📁 docs/
│ ├── 📁 architecture/
│ ├── 📁 api/
│ └── 📁 guides/
│
├── 📁 scripts/
│ ├── 📄 seed.ts
│ ├── 📄 migrate.ts
│ └── 📄 generate-module.ts
│
├── 📄 .env.example
├── 📄 .eslintrc.js
├── 📄 .prettierrc
├── 📄 jest.config.js
├── 📄 tsconfig.json
├── 📄 nest-cli.json
├── 📄 package.json
└── 📄 README.md
