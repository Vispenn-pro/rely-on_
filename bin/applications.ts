import * as path from 'path'
import * as fs from 'fs'
import * as readline from 'readline'
import * as uuid from 'uuid'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const applicationsPath = path.join(__dirname, '../src/renderer/src/components/applications')
const applicationsConstantPath = path.join(__dirname, '../src/shared/constant.tsx')
const indexAppsPath = path.resolve(
  __dirname,
  '../src/renderer/src/components/applications/index.ts'
)

rl.question("Quel est le nom de l'application ? ", (answer) => {
  //#region Validation du nom de l'application
  const sanitizedAnswer = answer.trim().replace(/\s+/g, '_').toLowerCase()
  if (!sanitizedAnswer) {
    console.log("Le nom de l'application ne peut pas être vide.")
    rl.close()
    return
  }

  const capitalizedAnswer =
    sanitizedAnswer.charAt(0).toUpperCase() + sanitizedAnswer.slice(1).toLocaleLowerCase()
  const uppercaseAnswer = sanitizedAnswer.toUpperCase()

  const newAppPath = path.join(applicationsPath, capitalizedAnswer)

  if (fs.existsSync(newAppPath)) {
    console.log(`L'application '${capitalizedAnswer}' existe déjà !`)
    rl.close()
    return
  }
  //#endregion

  //#region Création des contenu des fichiers
  const ApplicationContent = `type Props = {}

export default function ${capitalizedAnswer}{XXX}({}: Props) {
  return (
    <div>${capitalizedAnswer} {XXX}</div>
  )
}`

  const ApplicationIndex = `import Content from "./${capitalizedAnswer}Content"
import Sidebar from "./${capitalizedAnswer}Sidebar"

const ${capitalizedAnswer} = {
  Sidebar,
  Content,
}

export default ${capitalizedAnswer}`
  //#endregion

  try {
    fs.mkdirSync(newAppPath, { recursive: true })

    //#region Création des fichiers pour l'application
    const indexFilePath = path.join(newAppPath, 'index.tsx')
    const contentFilePath = path.join(newAppPath, `${capitalizedAnswer}Content.tsx`)
    const sidebarFilePath = path.join(newAppPath, `${capitalizedAnswer}Sidebar.tsx`)

    const contentContent = ApplicationContent.replace(/[{]XXX[}]/g, 'Content')
    const sidebarContent = ApplicationContent.replace(/[{]XXX[}]/g, 'Sidebar')
    const indexContent = ApplicationIndex

    fs.writeFileSync(contentFilePath, contentContent)
    fs.writeFileSync(sidebarFilePath, sidebarContent)
    fs.writeFileSync(indexFilePath, indexContent)
    //#endregion

    //#region Modification du fichier index.ts dans le dossier applications
    let content = fs.readFileSync(indexAppsPath, 'utf-8')

    // === 1. Ajout de l'import, regroupé avec les autres ===
    const importComment = '// Insert new application imports here'
    const mapComment = '// Insert new application mapping here'

    const newImports = `import ${capitalizedAnswer} from "./${capitalizedAnswer}";\n`
    const newMapping = `  [APPLICATIONS_NAME.${uppercaseAnswer}]: ${capitalizedAnswer},\n`

    // Insertion des imports
    const importIndex = content.indexOf(importComment)
    if (importIndex !== -1 && !content.includes(newImports.trim())) {
      content = content.slice(0, importIndex) + newImports + content.slice(importIndex)
    }

    // Insertion du mapping
    const mapIndex = content.indexOf(mapComment)
    if (mapIndex !== -1 && !content.includes(newMapping.trim())) {
      content = content.slice(0, mapIndex) + newMapping + content.slice(mapIndex)
    }

    // === Sauvegarder le fichier ===
    fs.writeFileSync(indexAppsPath, content, 'utf-8')
    //#endregion

    //#region Mise à jour des constantes dans le fichier
    let constantContent = fs.readFileSync(applicationsConstantPath, 'utf-8')

    const importApplicationNameComment =
      '// Insert new application names here | [DO NOT EDIT THIS LINE]'
    const importApplicationObjComment =
      '// Insert new application objects here | [DO NOT EDIT THIS LINE]'

    const newApplicationName = `    ${uppercaseAnswer}: '${capitalizedAnswer}',\n`
    const newApplicationObj = `  { id: '${uuid.v4()}', name: APPLICATIONS_NAME.${uppercaseAnswer}, icon: <></> },\n`

    // Insertion des imports
    const nameIndex = constantContent.indexOf(importApplicationNameComment)
    if (nameIndex !== -1 && !constantContent.includes(newApplicationName.trim())) {
      constantContent =
        constantContent.slice(0, nameIndex) + newApplicationName + constantContent.slice(nameIndex)
    }

    // Insertion du mapping
    const objIndex = constantContent.indexOf(importApplicationObjComment)
    if (objIndex !== -1 && !constantContent.includes(newApplicationObj.trim())) {
      constantContent =
        constantContent.slice(0, objIndex) + newApplicationObj + constantContent.slice(objIndex)
    }

    fs.writeFileSync(applicationsConstantPath, constantContent, 'utf-8')

    //#endregion
  } catch (err) {
    console.error("Erreur lors de la création de l'application :", err)
  }

  rl.close()
})
