import app from '../src/server.js';
import request from 'supertest';

describe("Bateria de test de servidor", () => {

    test("Servidor en endpoint /", async () => {

        return await request(app)
            .get('/')
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe("Hola mundo al usuario spensiones");
            });
    });


    test("Servidor en endpoint /api-key", async () => {

        return await request(app)
            .get('/api-key')
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe("la apikey de mi aplicacion es: default-key");
            });
    });

    test("Servidor en endpoint /validar-rut?rut=111601658", async () => {

        return await request(app)
            .get('/validar-rut?rut=111601658')
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe("El rut suministrado (111601658) es : valido");
            });
    });

    test("Servidor en endpoint /validar-rut?rut=111601650", async () => {

        return await request(app)
            .get('/validar-rut?rut=111601650')
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe("El rut suministrado (111601650) es : invalido");
            });
    });

    test("Servidor en endpoint /buscar-subcadena?cadena=paralelepipedo&subcadena=le", async () => {

        return await request(app)
            .get('/buscar-subcadena?cadena=paralelepipedo&subcadena=le')
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe("La cadeja \"paralelepipedo\" tiene 2 repeticiones de la subcadena \"le\"");
            });
    });

  

});