# src

Raiz do código fonte do backend.

- `app.ts` / `server.ts`: inicialização e bootstrap do servidor.
- `config/`: configuração e leitura de variáveis de ambiente (equivalente a `settings.py`).
- `api/`: código por domínio/recursos (controllers, models, services, etc.).
- `loaders/`: inicializadores (DB, cache, filas).
- `jobs/`: tarefas agendadas/workers.
- `routes/`: definição de rotas Express (montagem de routers).
- `utils/`: utilitários pequenos e helpers reusáveis.
- `helpers/`: trechos de infraestrutura/arquitetura (adaptadores, mapeamentos).
- `types/`: tipos TypeScript compartilhados ou declarações (`.d.ts`).
- `tests/`: testes unitários/integrados.
