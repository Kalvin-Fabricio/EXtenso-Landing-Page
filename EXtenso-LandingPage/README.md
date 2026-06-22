# EXtenso - Landing Page

Landing page desenvolvida em **React + TypeScript + CSS**, baseada na estrutura do projeto de exemplo enviado em aula, mas refatorada para o tema **EXtenso**, um aplicativo de organização de rotina inspirado em ferramentas como Notion.

## Tema do projeto

O EXtenso é um aplicativo para centralizar notas, lembretes, tarefas, metas, pastas e informações importantes em uma interface visual com cores por área da vida, como faculdade, pessoal, casa e trabalho.

## Seções implementadas

- Header responsivo com menu mobile
- Hero com chamada principal e mockup visual do aplicativo
- Benefícios
- Funcionalidades
- Preços
- Bloco de destaque
- Contato
- Footer

## Conceitos aplicados

### Componentização

A interface foi dividida em componentes reutilizáveis dentro da pasta `src/components`, como `Header`, `Button`, `FeatureCard`, `TierCard`, `ContactForm`, `AppMockup` e `Footer`.

### useState

O `useState` foi usado para controlar o menu mobile, os campos do formulário, o carregamento do envio e a mensagem de retorno.

### useEffect

O `useEffect` foi usado em dois pontos principais:

- No `Header`, para observar qual seção está visível e destacar o link ativo.
- No `ContactForm`, para remover automaticamente a mensagem de sucesso ou erro após alguns segundos.

### Cleanup

No `ContactForm`, o timer criado para limpar a mensagem é removido no retorno do `useEffect`, evitando comportamento indesejado caso o componente seja desmontado.

### useContext

Foi criado um contexto em `src/context/ThemeContext.tsx` para controlar o tema claro/escuro da landing page. O tema também é salvo no `localStorage`.

### Responsividade

O CSS possui media queries para adaptar grid, menu, hero, cards, preços e footer para telas menores.

### Netlify Functions

O formulário de contato envia os dados para a rota:

```txt
/api/send-email
```

Essa rota é redirecionada pelo `netlify.toml` para:

```txt
/.netlify/functions/send-email
```

A função está em:

```txt
netlify/functions/send-email.ts
```

Ela usa `nodemailer` para enviar o e-mail para o endereço configurado nas variáveis de ambiente.

## Como rodar localmente

```bash
npm install
npm run dev
```

Para testar também a função do Netlify localmente:

```bash
npm install -g netlify-cli
netlify dev
```

## Variáveis de ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=koolvinffr@gmail.com
SMTP_PASS=sua_senha_de_app_do_google
CONTACT_EMAIL=koolvinffr@gmail.com
ALLOWED_ORIGIN=http://localhost:8888
```

> Não envie o arquivo `.env` para o GitHub.

## Configuração no Netlify

No painel do Netlify, use:

```txt
Build command: npm run build
Publish directory: dist
Functions directory: netlify/functions
```

Depois cadastre as variáveis:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_EMAIL`
- `ALLOWED_ORIGIN`

Para Gmail, use senha de app do Google, não a senha normal da conta.
