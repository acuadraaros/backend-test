import { describe, test, expect } from "@jest/globals";
import { validarRUT } from "../../src/app/rut";

describe("Bateria de test de rut", () => {

    test("Prueba basica", () => {
        expect(1).toBe(1);
    });

    test("Valida el rut", () => {

        expect(validarRUT('111601658')).toBe(true);

        expect(validarRUT('123456789')).toBe(false);

        expect(validarRUT('1')).toBe(false);

        expect(validarRUT('solodig5')).toBe(false);

        expect(validarRUT('5399976K')).toBe(true);

        expect(validarRUT('5399976k')).toBe(true);

        expect(validarRUT('197156880')).toBe(true);

     

    });
    

});