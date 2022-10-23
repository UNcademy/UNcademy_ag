export const acadRegTypesDef=`
    type academic{
        userId: String
        semestre: String
        creditosInscritos: Int
        creditosAprobados: Int
        creditosPendientes: Int
        creditosCursados: Int
        creditosCancelados: Int
        papa: Float
        pa: Float
        pappi: Float
        avance: String
        materias:[materia]
        programa: programa       
    }

    input academicInput{
        userId:String
        semestre:String
        creditosInscritos:Int
        creditosAprobados:Int
        creditosPendientes:Int
        creditosCursados:Int
        creditosCancelados:Int
        papa:Float
        pa:Float
        pappi:Float
        avance:String
        materias:[materiaInput]
        programa: programaInput
    }

    type materia{
        materiaId:String
        tipologia:String
        nombre:String
        nota:Float
        aprobado:Boolean
        creditos:Int
    }

    input materiaInput{
        materiaId: String
        tipologia: String
        nombre: String
        nota: Float
        aprobado: Boolean
        creditos: Int
    }

    type programa{
        programaId:String
        creditosDisciplinarOpt:Int
        creditosDisciplinarOb:Int
        creditosFundamentacionOpt:Int
        creditosFundamentacionOb:Int
        creditosLibreEleccion:Int
        creditosTrabajoDeGrado: Int
    }
    input programaInput{
        programaId:String
        creditosDisciplinarOpt:Int
        creditosDisciplinarOb:Int
        creditosFundamentacionOpt:Int
        creditosFundamentacionOb:Int
        creditosLibreEleccion:Int
        creditosTrabajoDeGrado: Int
    }
`;

export const academicQueries=`
    getAcademic(id:String):[academic]
    getAllAcademic:[academic]
    getMaterias(id:String):[materia]
    getPrograma:[programa]

`;
export const academicMutations=`
createAcademic(acad:academicInput):[academic]
`;

