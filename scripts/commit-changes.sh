#!/bin/bash

# Configurar git
git config user.name "v0[bot]"
git config user.email "v0[bot]@users.noreply.github.com"

# Agregar todos los cambios
git add .

# Crear commit con descripción clara
git commit -m "refactor: simplify semester module and improve code organization

- Create useSemesters custom hook to centralize state and logic
- Simplify component props and unify modal handling
- Rename components for consistency (PascalCase)
- Rename shared components (DatePickerDemo -> DatePicker, SelectDemo -> SelectField)
- Remove debug console.log from authContext
- Fix Turbopack root configuration in next.config.ts
- Improve code structure and reduce prop drilling

Co-authored-by: v0[bot] <v0[bot]@users.noreply.github.com>"

# Push los cambios a la rama actual
git push origin $(git rev-parse --abbrev-ref HEAD)

echo "✅ Cambios enviados exitosamente a GitHub"
