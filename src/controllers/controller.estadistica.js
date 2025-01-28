
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





export const cantidadExamenesPorDiaEmpresa = async (req, resp) => {
    try {
        const examenesDia = await prisma.$queryRaw`
        SELECT emp.nombre,count(ex.id_examen) as cantidad FROM empresas emp
                join contratos cont on cont.empresaId= emp.id_empresa
                join facturas fact on fact.contratoId= cont.id_contrato
                join examenes ex on ex.facturaId=id_factura
                where ex.estado='Resultados_Listos' and date(ex.fecha_resultado)= date( curdate())
                group by emp.nombre
        `;
        // Convertir BigInt a String
        const resultado = examenesDia.map((row) => ({
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