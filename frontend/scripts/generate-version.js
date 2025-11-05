import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getGitInfo() {
  try {
    // Get git hash (first 8 characters)
    const gitHash = execSync('git rev-parse --short=8 HEAD', { encoding: 'utf-8' }).trim();
    
    // Get commit date
    const commitDate = execSync('git log -1 --format=%cd --date=format:"%Y-%m-%d %H:%M:%S"', { encoding: 'utf-8' }).trim();
    
    // Get commit author
    const commitAuthor = execSync('git log -1 --format=%an', { encoding: 'utf-8' }).trim();
    
    // Get version from git tag (latest tag)
    let version = 'dev';
    try {
      version = execSync('git describe --tags --abbrev=0', { encoding: 'utf-8' }).trim();
    } catch (e) {
      // If no tags exist, use default version
      console.log('No git tags found, using default version: dev');
    }
    
    return {
      gitHash,
      commitDate,
      commitAuthor,
      version,
    };
  } catch (error) {
    console.error('Error getting git info:', error.message);
    return {
      gitHash: 'unknown',
      commitDate: new Date().toISOString(),
      commitAuthor: 'unknown',
      version: 'dev',
    };
  }
}

function generateVersionFile() {
  const versionInfo = getGitInfo();
  
  const envContent = `# Auto-generated version info - DO NOT EDIT MANUALLY
VITE_GIT_HASH=${versionInfo.gitHash}
VITE_COMMIT_DATE=${versionInfo.commitDate}
VITE_COMMIT_AUTHOR=${versionInfo.commitAuthor}
VITE_VERSION=${versionInfo.version}
`;

  const versionFilePath = join(__dirname, '..', '.env.version');
  writeFileSync(versionFilePath, envContent, 'utf-8');
  
  console.log('✅ Version info generated successfully:');
  console.log(`   Git Hash: ${versionInfo.gitHash}`);
  console.log(`   Commit Date: ${versionInfo.commitDate}`);
  console.log(`   Commit Author: ${versionInfo.commitAuthor}`);
  console.log(`   Version: ${versionInfo.version}`);
}

generateVersionFile();
