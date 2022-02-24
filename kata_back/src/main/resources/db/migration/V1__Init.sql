create sequence kata_schema.transaction_sequence start 1 increment 1;
create table kata_schema.account (account_name varchar(255) not null, balance int8, primary key (account_name));
create table kata_schema.transaction (tx_id int8 not null, action int4, amount int8, date timestamp, account_account_name varchar(255), primary key (tx_id));
alter table kata_schema.transaction add constraint FKmcirc30y9n4rr2s0s6no3wsnm foreign key (account_account_name) references kata_schema.account;
