# 🌮 TACOTITO’S Food Truck — Class Model

This document defines the class structure for *TACOTITO’S Food Truck*, following **Gen/Spec** modeling.

---

## 📋 Overview

The system allows taco creation through:
- **One tortilla** (single or double),
- **One to five fillings** (at least one required),
- **Zero or one sauce** (optional).

| Layer | Description |
|--------|-------------|
| **Interface** | Defines structure contracts like `ITaco`. |
| **Domain** | Represents real-world concepts like `Taco`, `Filling`, `Sauce`, and `Tortilla`. |
| **Controller** | Manages creation, updates, and business logic. |

---

## 🧩 Class Diagram

```mermaid
---
config:
  layout: elk
  look: classic
  theme: mc
---
classDiagram
direction LR
class TacoContent {
  +id?: number
  +name: string
  +price: number
}

class ITaco {
  +id?: number
  +tortilla: TacoContent
  +sauce?: Sauce
  +fillings: Filling[]
}

class TacoStats {
  +value: number|null
  +tortillaType: "single" | "double" | null
  +sauce: string|null
  +fillings: string[]|null
}

class Tortilla {
  -_id?: number
  -_name: string
  -_price: number
  -_tortillaType: "single" | "double"
}
Tortilla ..|> TacoContent : is a

class Sauce {
  -_id?: number
  -_name: string
  -_price: number
}
Sauce ..|> TacoContent : is a

class Filling {
  -_id?: number
  -_name: string
  -_price: number
}
Filling ..|> TacoContent : is a

class Taco {
  -_id?: number
  -_tortilla: TacoContent
  -_fillings: Filling[]
  -_sauce?: Sauce
}
Taco ..|> ITaco : implements

class IngredientController {
  +constructor()
  +getFillings(): Filling[]
  +getSauces(): Sauce[]
  +createFilling(filling: Filling): Filling
  +createSauce(sauce: Sauce): Sauce
  +replaceFilling(id: number, filling: Filling): Filling
  +replaceSauce(id: number, sauce: Sauce): Sauce
  +removeFilling(id: number): void
  +removeSauce(id: number): void
  +getCheapestFilling(): Filling|null
  +getMostExpensiveFilling(): Filling|null
  +getAverageFillingPrice(): number
  +getCheapestSauce(): Sauce|null
  +getMostExpensiveSauce(): Sauce|null
  +getAverageSaucePrice(): number
}

class TacoContentController {
  +constructor()
  +listTortillas(): TacoContent[]
  +createTortilla(tortilla: TacoContent): TacoContent
  +replaceTortilla(id: number, tortilla: TacoContent): TacoContent
  +removeTortilla(id: number): void
  +getCheapestTortilla(): TacoContent|null
  +getMostExpensiveTortilla(): TacoContent|null
  +getAverageTortillaPrice(): number
}

class TacoController {
  +constructor()
  +getCheapestTaco(): TacoStats|null
  +getMostExpensiveTaco(): TacoStats|null
  +getAverageTacoPrice(): number
}

Taco "1" *-- "1" TacoContent : always contains
Taco "1" o-- "1..5" Filling : participates in
Taco "1" o-- "0..1" Sauce : participates in
