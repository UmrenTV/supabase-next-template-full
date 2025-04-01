# Components Directory Structure

This directory follows Atomic Design principles to create a modular and maintainable component system.

## Directory Structure

```
/components
├── /atoms          # Basic building blocks (buttons, inputs, labels, etc.)
├── /molecules      # Combinations of atoms (cards, form groups, etc.)
└── /organisms      # Complex UI sections (headers, feature sections, etc.)
```

## Atomic Design Principles

### Atoms
- Basic building blocks of the interface
- Examples: buttons, inputs, labels, icons
- Highly reusable and context-independent
- Located in `/atoms`

### Molecules
- Simple combinations of atoms
- Examples: form groups, cards, search bars
- More specific and contextual than atoms
- Located in `/molecules`

### Organisms
- Complex UI sections composed of molecules and atoms
- Examples: headers, feature sections, forms
- Highly contextual and specific to their use case
- Located in `/organisms`

## Best Practices

1. Each component should have its own directory with:
   - Main component file (e.g., `button.tsx`)
   - Types/interfaces (if complex)
   - Tests (if applicable)
   - Any component-specific utilities

2. Use TypeScript interfaces for props
3. Keep components focused and single-responsibility
4. Export components through index files
5. Use composition over inheritance
6. Prefer server components unless client-side interactivity is needed 