## BackEnd
Motivos pelo qual usei o [Adonis v5](https://preview.adonisjs.com/):
  * Framework perfeito para POC, poís já vem com um conjunto de recursos já integrados evitando gasto cognitivo com arquitetura e boilerplate
  * Typescript com ESLINT e Prettier configurado
  * Dotenv
  * ORM

## Exemplo de requests para API:
[api/@developer/request.http](https://github.com/ymoreiratiti/TestePraticoNode/blob/main/api/%40developer/request.http)

## Regra de calculo dos juros
* Documentação sobre o calculo de juros e mora: https://nimbly.com.br/blog/como-calcular-multa-e-juros-de-boletos-atrasados/
* Conta os dias à partir da data de vencimento, incluindo a data de pagamento

## Questionamentos sobre a regra de negócio:
* Serviços
  * Inclusão de conta a pagar
    * A rotina serve para inserir contas pendentes de pagamento? Se sim o campo "Data de pagamento" não pode ser obrigatório (Conforme informado na RN), poís a informação ainda não existe no momento do lançamento do registro
  * Listagem das contas cadastradas
    * Se existe a Data de Vencimento e a Data de Pagamento, por que persistir a quantidade de dias de atraso? Essa informação é alterada diariamente e dependendo do tamanho do banco de dados pode ser necessário um workter/crontab para atualizar essa informação 
