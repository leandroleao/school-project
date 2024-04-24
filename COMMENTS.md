a. Decisão da arquitetura utilizada
Conforme solicitado, utilizei os itens obrigatórios na construção: Vue, Vuetify, Node e Mysql.

BACKEND 
- "server"
Conexão com o banco de dados mysql e configuração de rotas

- "src/controllers"
Interface com as chamadas da rest API de acordo com as rotas pré-definidas

- "src/services"
Acesso ao sql/CRUD

FRONTEND
- "App.vue"
Estrutura geral de interface com chamada dinamica do content

- "src/components"
Macro componentes de interface com o usuário



b. Lista de bibliotecas de terceiros utilizadas
Além das obrigatórias, utilizei:
- express/bodyParser/cors para chamadas de backEnd
- axios para integraçãos com a rest API

c. O que você melhoraria se tivesse mais tempo
- Validações - e-mail/cpf no formulário de cadastro de aluno
- Camada de login para controle de acesso ao sistema
- Ajuste na paginação e inserir busca de usuário por nome/cpf/ra
- Internacionalização de dicionários com padrão i18n
- Testes unitários

d. Quais requisitos obrigatórios que não foram entregues
- Campos não editáveis do cadastro - estão todos editáveis
- ra como chave única - faltou validação e definição no banco de dados



