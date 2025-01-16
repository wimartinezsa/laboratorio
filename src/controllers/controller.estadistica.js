
import prisma from '../libs/prisma.js'



export const cantidadPacientes = async (req, resp) => {
    try {
        const pacientes = await prisma.$queryRaw`
        SELECT COUNT(*) AS cantidad FROM pacientes
        `;
        // Convertir BigInt a String
        const resultado = pacientes.map((row) => ({
            ...row,
            cantidad: row.cantidad.toString(),
        }));
        return resp.status(200).json(resultado);
    } catch (error) {
        console.error("Error en controller.estadistica.js:", error);
        return resp.status(500).json({
            status: 500,
            message: 'Error al listar estadística',
        });
    }
};



export const cantidadEmpresas = async (req, resp) => {
    try {
        const empresas = await prisma.$queryRaw`
        SELECT COUNT(*) AS cantidad FROM empresas
        `;
        // Convertir BigInt a String
        const resultado = empresas.map((row) => ({
            ...row,
            cantidad: row.cantidad.toString(),
        }));
        return resp.status(200).json(resultado);
    } catch (error) {
        console.error("Error en controller.estadistica.js:", error);
        return resp.status(500).json({
            status: 500,
            message: 'Error al listar estadística',
        });
    }
};




export const contratosActivos = async (req, resp) => {
    try {
        const contratos = await prisma.$queryRaw`
        SELECT COUNT(*) AS cantidad FROM contratos WHERE estado='Activo'
        `;
        // Convertir BigInt a String
        const resultado = contratos.map((row) => ({
            ...row,
            cantidad: row.cantidad.toString(),
        }));
        return resp.status(200).json(resultado);
    } catch (error) {
        console.error("Error en controller.estadistica.js:", error);
        return resp.status(500).json({
            status: 500,
            message: 'Error al listar estadística',
        });
    }
};







export const cantidadContratos = async (req, resp) => {
    try {
        const contratos = await prisma.$queryRaw`
        SELECT COUNT(*) AS cantidad FROM contratos WHERE estado='Activo'
        `;
        // Convertir BigInt a String
        const resultado = contratos.map((row) => ({
            ...row,
            cantidad: row.cantidad.toString(),
        }));
        return resp.status(200).json(resultado);
    } catch (error) {
        console.error("Error en controller.estadistica.js:", error);
        return resp.status(500).json({
            status: 500,
            message: 'Error al listar estadística',
        });
    }
};



export const examenesTomaMuestra = async (req, resp) => {
    try {
        const contratos = await prisma.$queryRaw`
        SELECT COUNT(*) AS cantidad FROM examenes WHERE estado='En_Toma_de_Muestra'
        `;
        // Convertir BigInt a String
        const resultado = contratos.map((row) => ({
            ...row,
            cantidad: row.cantidad.toString(),
        }));
        return resp.status(200).json(resultado);
    } catch (error) {
        console.error("Error en controller.estadistica.js:", error);
        return resp.status(500).json({
            status: 500,
            message: 'Error al listar estadística',
        });
    }
};





export const examenesProcesoAnalisis = async (req, resp) => {
    try {
        const contratos = await prisma.$queryRaw`
        SELECT COUNT(*) AS cantidad FROM examenes WHERE estado='En_Proceso_de_Analisis'
        `;
        // Convertir BigInt a String
        const resultado = contratos.map((row) => ({
            ...row,
            cantidad: row.cantidad.toString(),
        }));
        return resp.status(200).json(resultado);
    } catch (error) {
        console.error("Error en controller.estadistica.js:", error);
        return resp.status(500).json({
            status: 500,
            message: 'Error al listar estadística',
        });
    }
};






export const examenesResultadosListos = async (req, resp) => {
    try {
        const contratos = await prisma.$queryRaw`
        SELECT COUNT(*) AS cantidad FROM examenes WHERE estado='Resultados_Listos'
        `;
        // Convertir BigInt a String
        const resultado = contratos.map((row) => ({
            ...row,
            cantidad: row.cantidad.toString(),
        }));
        return resp.status(200).json(resultado);
    } catch (error) {
        console.error("Error en controller.estadistica.js:", error);
        return resp.status(500).json({
            status: 500,
            message: 'Error al listar estadística',
        });
    }
};





export const examenesResultadosEntregados = async (req, resp) => {
    try {
        const contratos = await prisma.$queryRaw`
        SELECT COUNT(*) AS cantidad FROM examenes WHERE estado='Resultados_Entregados'
        `;
        // Convertir BigInt a String
        const resultado = contratos.map((row) => ({
            ...row,
            cantidad: row.cantidad.toString(),
        }));
        return resp.status(200).json(resultado);
    } catch (error) {
        console.error("Error en controller.estadistica.js:", error);
        return resp.status(500).json({
            status: 500,
            message: 'Error al listar estadística',
        });
    }
};