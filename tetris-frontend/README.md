# Tetris frontend

Frontend estático em HTML, CSS e JavaScript ES Modules.

## Rodar localmente

Na pasta `tetris-frontend` execute:

```bash
python3 -m http.server 5500
```

Abra http://localhost:5500. Não abra index.html com file://, pois os módulos JavaScript devem ser servidos por HTTP.

## Controles

Setas para movimentar e girar, espaço para queda instantânea, P para pausar. Há botões para celular.

## Integração com Spring Boot

`js/api.js` contém clientes para `/api/auth/me` e `/api/scores`, mas o jogo ainda não os chama. É necessário implementar autenticação, CSRF, endpoints e hospedagem com proxy da API antes de habilitar o envio. Pontuações locais podem ser adulteradas: para ranking competitivo, validar partidas no servidor.

## Observações

Esta é uma versão MVP do motor: rotações com deslocamentos simples, não a especificação SRS completa. Não há sistema de hold nem randomização 7-bag.
