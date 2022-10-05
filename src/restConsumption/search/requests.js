import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';
import request from "request-promise-native";

const URL = `http://${url}:${port}/${entryPoint}`;

const requests = {
    searchAllCampus: (_) =>
        generalRequest(`${URL}/sedes`, 'GET'),

    searchAllFaculties: (_) =>
        generalRequest(`${URL}/facultades`, 'GET'),

    searchAllSubjects: (_) =>
        generalRequest(`${URL}/materias`, 'GET'),

    searchSubjectByName: (_, { courseName }) =>
        generalRequest(`${URL}/nombre/${courseName}`, 'GET'),

    searchSubjectByCode: (_, { courseCode }) =>
        generalRequest(`${URL}/codigo/${courseCode}`, 'GET'),

    searchSubjectByType: (_, { courseType }) =>
        generalRequest(`${URL}/tipologia/${courseType}`, 'GET'),

    searchSubjectById: (_, { courseId }) =>
        generalRequest(`${URL}/id/${courseId}`, 'GET'),

    searchSubjectByKeyword: (_, { keyword }) =>
        generalRequest(`${URL}/keyword/${keyword}`, 'GET'),

    searchmateriaByPlan: (_, { Id }) =>
        generalRequest(`${URL}/materiaByPlan/${Id}`, 'GET'),

    groupBynumer: (_, { groupNumber }) =>
        generalRequest(`${URL}/groupBynumer/${groupNumber}`, 'GET'),

    searchByProfessor: (_, { teacherName }) =>
        generalRequest(`${URL}/groupByProfessor/${teacherName}`, 'GET'),

    groupByQuota: (_) =>
        generalRequest(`${URL}/groupByQuota`, 'GET'),

    groupById: (_, {groupId}) =>
        generalRequest(`${URL}/groupById/${groupId}`, 'GET'),

    subGrupoByGrupoId: (_, {subGroupId}) =>
        generalRequest(`${URL}/subGrupoByGrupoId/${subGroupId}`, 'GET'),

    updateGroup: (_, {id, group}) =>
        generalRequest(`${URL}/updateGroup/${id}`, 'PUT', group)
};

export default requests;