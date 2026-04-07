import { execSync } from 'child_process';

try {
  console.log('🔧 Configurando git...');
  execSync('git config user.name "v0[bot]"', { stdio: 'inherit' });
  execSync('git config user.email "v0[bot]@users.noreply.github.com"', { stdio: 'inherit' });

  console.log('📝 Agregando cambios...');
  execSync('git add .', { stdio: 'inherit' });

  console.log('💾 Creando commit...');
  const commitMessage = `refactor: simplify semester module and improve code organization

- Create useSemesters custom hook to centralize state and logic
- Simplify component props and unify modal handling
- Rename components for consistency (PascalCase)
- Rename shared components (DatePickerDemo -> DatePicker, SelectDemo -> SelectField)
- Remove debug console.log from authContext
- Fix Turbopack root configuration in next.config.ts
- Improve code structure and reduce prop drilling

Co-authored-by: v0[bot] <v0[bot]@users.noreply.github.com>`;

  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

  console.log('🚀 Haciendo push...');
  const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
  execSync(`git push origin ${branch}`, { stdio: 'inherit' });

  console.log('✅ ¡Cambios subidos exitosamente a GitHub!');
  console.log(`📌 Rama: ${branch}`);
} catch (error) {
  console.error('❌ Error durante el proceso:', error.message);
  process.exit(1);
}
