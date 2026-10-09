# Dolphin AI Website

Ready React + Vite website for Dolphin AI.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal, usually:

```txt
http://localhost:5173/
```

## Files to edit

- `src/App.jsx` — website content
- `src/style.css` — colors and design

## Secrets and configuration

The API's secrets live in **Azure Key Vault `dolphinai-kv`** (resource group
`Spend-Analytics`). They are *not* stored in the App Service configuration and must
not be committed to this repo.

The App Service `dolphinai-api` reads them through Key Vault references, resolved at
startup by its system-assigned managed identity. Application code is unchanged — it
still reads plain environment variables via `os.getenv`:

| Environment variable | Key Vault secret |
| --- | --- |
| `OPENAI_API_KEY` | `OPENAI-API-KEY` |
| `RESEND_API_KEY` | `RESEND-API-KEY` |
| `AZURE_SQL_USER` | `AZURE-SQL-USER` |
| `AZURE_SQL_PASS` | `AZURE-SQL-PASS` |
| `SMTP_USER` | `SMTP-USER` |
| `SMTP_PASS` | `SMTP-PASS` |

Non-secret settings (`AZURE_SQL_SERVER`, `AZURE_SQL_DATABASE`, `SMTP_HOST`,
`SMTP_PORT`, `FROM_EMAIL`, `NOTIFY_EMAIL`) remain plain App Service settings.

### Rotating a secret

References are versionless, so updating the vault is enough — no app setting changes:

```bash
az keyvault secret set --vault-name dolphinai-kv --name OPENAI-API-KEY --value '<new value>'
az webapp restart -g Spend-Analytics -n dolphinai-api   # picks it up immediately
```

### Checking that references resolve

```bash
az rest --method get --url "https://management.azure.com/subscriptions/\
660b9829-1d93-4527-979d-b074f7d5054a/resourceGroups/Spend-Analytics/providers/\
Microsoft.Web/sites/dolphinai-api/config/configreferences/appsettings?api-version=2022-03-01" \
  --query "value[].{name:name,status:properties.status}" -o table
```

### Local development

Local runs still read `api/.env`, which is git-ignored and never deployed. Grant a
developer read access to the vault with:

```bash
az keyvault set-policy --name dolphinai-kv --upn <user@dolphinaipro.com> \
  --secret-permissions get list
```
