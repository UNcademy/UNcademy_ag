import { generalRequest } from '../../utilities';
import { url, port } from './server';

const URL = `http://${url}:${port}`;

const request = {
    finalGradesByGroup: (_, { groupId }) =>
        generalRequest(`${URL}/finalgrade/group/${groupId}`, 'GET'),
    finalGradesByStudent: (_, { studentName }) =>
        generalRequest(`${URL}/finalgrade/student/${studentName}`, 'GET'),
    finalGradesByStudentAndGroup: (_, { groupId, studentName }) =>
        generalRequest(`${URL}/finalgrade/student/${groupId}/${studentName}`, 'GET'),
    getStats: (_, { groupId }) =>
        generalRequest(`${URL}/stats/${groupId}`, 'GET'),
    createFinalGrade: (_, { finalGrade }) =>
        generalRequest(`${URL}/finalgrade/save`, 'POST', finalGrade),
};

export default request