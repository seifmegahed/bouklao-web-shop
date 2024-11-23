Table customer {
  id int [pk] // Clerk Id?
  firstName varchar [not null]
  lastName varchar [not null]
  email varchar [unique, not null]
}

Table address {
  id int [pk]
  customerId int [ref: > customer.id]
  name varchar [not null]
  addressLine1 varchar [not null]
  addressLine2 varchar
  city smallint
  country smallint
  postalCode varchar
}

Table category {
  id int [pk]
  title varchar [not null, unique]
}

Table item {
  id int [pk]
  title varchar [not null]
  description varchar [not null]
  category int [not null, ref: > category.id]
  price numeral [not null]
  stock int [not null]
}

Table cartItem {
  id int [pk]
  customerId int [ref: > customer.id]
  itemId int [ref: > item.id]
  quantity int
}

Table order {
  id int [pk]
  customerId int [ref: > customer.id, not null]
  status int [not null]
  address varchar [not null]
  city varchar [not null]
  country varchar [not null]
  phoneNumber varchar [not null]
  deliveryNotes varchar
}

Table payment {
  id int [pk]
  orderId int [ref: > order.id, not null]
  paymentRef varchar [not null]
  status int [not null]
}

Table deliveryOrder {
  id int [pk]
  orderId int [ref: > order.id, not null]
  deliveryService varchar [not null]
  deriveryRef varchar [not null]
  status int [not null]
}

Table order_item {
  id int [pk]
  orderId int [ref: > order.id, not null]
  itemId int [ref: > item.id, not null]
  price numeral [not null]
  quantity int [not null]
}

Table admin {
  id int [pk]
  name varchar [not null]
  email varchar [not null]
  password varchar [not null]
}

Table image {
  id int [pk]
  itemId int [ref: > item.id, not null]
  url varchar [not null]
  description varchar
}
