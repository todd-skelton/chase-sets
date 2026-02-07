# Catalog Terminology & Definitions

This document defines the ubiquitous language for the **Catalog domain**.

The Catalog is responsible only for defining **what can be sold**.  
It does not manage inventory, listings, bids, pricing, or orders.

Other systems reference Catalog entities using stable identifiers.

---

# Goals of the Catalog

The Catalog exists to:

- Define Items that can be sold
- Provide structured classification and descriptive information
- Define selectable characteristics used to determine Versions
- Allow reusable composition of catalog knowledge
- Provide stable identifiers used by downstream systems
- Support search and filtering across product lines

---

# Core Structural Concepts

## Category

A **Category** represents a top-level grouping of products that share vocabulary and configuration.

Categories are visible to both consumers and administrators.

Examples:

- Pokémon Cards
- Magic: The Gathering
- Funko Pops
- Comics
- Apparel

A Category defines:

- Available Dimensions
- Available Blueprints
- Applicable Fields and Options
- Default rules and validation

A Category does NOT define the required structure of every item.  
That responsibility belongs to Blueprints.

Natural language:

> "Browse categories"  
> "Select a category"

---

## Dimension

A **Dimension** is a grouping used to organize Profiles and classify items.

Dimensions are defined per Category.

Examples (vary by category):

- Release
- Series
- Publisher
- Format
- Era

Dimensions:

- Organize Profiles
- Help guide admin selection
- Are not directly visible to buyers

Note: In most user interfaces, Dimension names are shown directly (e.g., "Release", "Series") rather than exposing the term "Dimension".

---

## Blueprint

A **Blueprint** defines the structure required to create an Item.

Blueprints determine:

- Required Dimensions
- Required Fields
- Available Specifications
- Available Options
- Validation rules
- Which sections appear in the admin interface

Blueprints ensure administrators only see relevant fields and inputs.

Examples:

- Trading Card — Single
- Trading Card — Sealed
- Plush
- Apparel
- Comic Issue

Natural language:

> "Choose a blueprint to create the item."

---

## Profile

A **Profile** is a reusable set of defaults and rules that enrich an Item.

Profiles:

- Belong to a Dimension
- May inherit from other Profiles
- Provide reusable catalog knowledge

A Profile may define:

- Default Fields
- Available Specifications
- Available Options
- Validation rules
- Default values
- Tags or classifications

Profiles do not define the overall structure of an Item; Blueprints do that.

Natural language:

> "Apply the Trainer profile."  
> "Apply the Scarlet & Violet profile."

---

## Profile Inheritance

Profiles may inherit from parent Profiles.

Inheritance allows:

- Shared definitions
- Reduced duplication
- Easier maintenance

---

# Item Concepts

## Item

An **Item** represents the core identity of a product or collectible.

An Item consists of:

- Identity fields (name, number, images)
- Applied Profiles
- Selected Blueprint
- Resulting effective definitions

Items:

- Do not contain inventory
- Do not contain pricing
- Do not contain listings

Natural language:

> "This is the item page."

---

# Item Data Model

## Fields

A **Field** is a typed piece of information stored about an Item.

Fields may be classified as:

- Detail (classification or identity)
- Specification (intrinsic characteristics)

Examples:

- Brand
- Manufacturer
- Publisher
- Artist
- HP
- Page Count
- Material

Fields are:

- Informational
- Searchable
- Not selectable by buyers

Fields are defined globally and reused across Categories when applicable.

---

## Field Registry

The **Field Registry** is the catalog’s collection of reusable Field definitions.

Each Field has:

- id (immutable)
- slug (stable)
- displayName (editable)
- data type
- classification
- searchable flag
- filterable flag

Fields may be:

- Global (usable across Categories)
- Category-specific

Search filters rely on Field IDs, not names.

---

## Options

An **Option** represents a selectable characteristic that defines Versions.

Examples:

- Condition
- Language
- Finish
- Size
- Grade
- Color

Each Option contains:

- Allowed values
- Rules
- Defaults

---

## Option Value

An **Option Value** is a specific selectable value within an Option.

Examples:

- Near Mint
- English
- Holo
- Medium
- PSA 10

Versions are defined by selected Option Values.

---

## Option Registry

The **Option Registry** contains reusable Option definitions.

Options may be:

- Global
- Category-specific

Search filters rely on Option IDs and Option Value IDs.

---

# Version

A **Version** represents a specific combination of Option Values for an Item.

Versions:

- Are defined logically
- Do not store inventory
- Do not store listings
- Have stable identifiers

Natural language:

> "I want the near mint version."

---

# Identity and Naming Rules

All catalog entities must support:

- id (immutable internal identifier)
- slug (stable external identifier)
- displayName (editable label)

Relationships always reference:

- id, never displayName

This allows:

- Safe renaming
- No data migrations for typos or naming changes

---

# Search and Filtering

## Global Filter

A **Global Filter** represents a cross-category search concept.

Examples:

- Brand
- Manufacturer
- Franchise
- Release
- Category
- Condition
- Language
- Size
- Color

Each Global Filter defines:

- id
- displayName
- data type
- sort behavior
- visibility rules

---

## Filter Mapping

A **Filter Mapping** defines how a Field or Option maps to a Global Filter.

Examples:

- Pokémon Expansion → Release
- MTG Set → Release
- Yu-Gi-Oh Booster Set → Release

Filter mapping allows:

- Cross-category filtering
- Consistent search experience
- Flexible category vocabulary

Filter values remain distinct; only the filter category is shared.

---

## Search Behavior

Search operates on:

- Field IDs
- Option IDs
- Option Value IDs
- Filter mappings

Filters appear based on:

- Filterable flag
- Coverage in result set
- Relevance to current results

---

## Cross-Category Search

When search spans multiple Categories:

Global filters may include:

- Brand
- Manufacturer
- Franchise
- Category
- Release

Contextual filters appear after narrowing:

- Series
- Rarity
- Grade
- Language
- Publisher

Filters are determined by Field presence, not Category type.

---

# Effective Catalog Definition

The system computes an **Effective Catalog Definition** by merging:

- Blueprint rules
- Applied Profiles
- Inherited Profiles
- Item-specific overrides

Merge rules determine:

- Final Fields
- Final Specifications
- Final Options
- Validation requirements

---

# Responsibilities of the Catalog

The Catalog is responsible for:

- Managing Categories
- Managing Dimensions
- Managing Profiles
- Managing Blueprints
- Managing Fields and Options
- Managing Items
- Determining Versions
- Providing search metadata

The Catalog is not responsible for:

- Inventory counts
- Listings or bids
- Pricing
- Orders
- Ownership

---

# Conceptual Model (Hierarchy View)

- Category
  - Dimensions
    - Profiles
      - Inheritance relationships
  - Blueprints
  - Field Registry
  - Option Registry
  - Items
    - Versions

---

# Design Principles

The Catalog system is designed to:

- Use natural language familiar to buyers and sellers
- Keep internal and external language aligned
- Avoid product-specific terminology in core entities
- Support multiple product categories
- Minimize duplication through composable Profiles
- Allow safe renaming of entities
- Provide stable identifiers for external systems
- Enable consistent cross-category filtering

---

# Future Considerations

- Localization of display names
- Profile versioning
- Audit history of changes
- Validation rules per blueprint
- Derived naming patterns for items
- Batch item creation workflows
- Search ranking and relevance tuning

---
