# Pruebas de Rendimiento con K6 y Generación de Reporte en HTML

Este proyecto utiliza K6 para realizar pruebas de rendimiento en el endpoint de **ReqRes** y generar un informe detallado en formato HTML. Las pruebas incluyen múltiples etapas de carga y evaluación de diferentes tipos de solicitudes HTTP (GET, POST).

## Requisitos Previos

Antes de empezar, asegúrate de tener instalados los siguientes componentes:

- **K6**: Una herramienta de pruebas de carga. [Instalación de K6](https://k6.io/docs/getting-started/installation/)
- **Node.js** y **npm**: Necesarios para instalar la herramienta de reporte en HTML.
- **k6-html-reporter**: Una utilidad para generar reportes en HTML a partir de los resultados de K6.

### Instalación de K6

Dependiendo de tu sistema operativo, sigue las instrucciones para instalar K6:

- **Ubuntu/Debian**:
  ```bash
  sudo apt-get install k6
```
### macOS

```bash
brew install k6
```

### Windows
```bash
choco install k6
```

### Ejecutar el Proyecto
```bash
k6 run performance_test.js
```