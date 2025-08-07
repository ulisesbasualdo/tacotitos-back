export class Utils {
    /**
     * Genera un identificador único universal (UUID) utilizando la API Crypto
     * @returns {string} Un UUID v4 (formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
     */
    static generarUUID(): string {
        // Verificamos que estemos en un entorno que soporta crypto.randomUUID()
        if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
            return crypto.randomUUID();
        }
        
        // Fallback para entornos que no soportan crypto.randomUUID()
        // Implementación básica de UUID v4
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
