import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

let ErrorCount = new Counter('error_count');

export let options = {
    stages: [
        { duration: '1m', target: 50 }, // Subida a 50 usuarios concurrentes
        { duration: '2m', target: 100 }, // Aumento a 100 usuarios
        { duration: '1m', target: 0 },  // Reducción de la carga
    ],
    thresholds: {
        http_req_duration: ['p(95)<200'], // 95% de las solicitudes deben tener un tiempo de respuesta < 200 ms
        'error_count': ['count<5'], // No más de 5 errores permitidos en toda la ejecución
    },
};

export default function () {
    let res = http.get('https://reqres.in/api/users?page=2');
    
    // Verificar estado de respuesta y duración
    check(res, {
        'status es 200': (r) => r.status === 200,
        'duración < 200ms': (r) => r.timings.duration < 200,
    }) || ErrorCount.add(1); // Incrementar error_count si falla la verificación

    // Simular una solicitud POST como parte del flujo de usuario
    let payload = JSON.stringify({ name: "QA Engineer", job: "Tester" });
    let headers = { 'Content-Type': 'application/json' };
    let postRes = http.post('https://reqres.in/api/users', payload, { headers: headers });

    check(postRes, {
        'status es 201': (r) => r.status === 201, // Verificar que el POST fue exitoso
    }) || ErrorCount.add(1);
    
    sleep(1);
}

// Generar reporte HTML al final de la ejecución
export function handleSummary(data) {
    return {
        "report/reqres_performance_report.html": htmlReport(data),
    };
}
