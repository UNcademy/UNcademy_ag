import { generalRequest } from '../../utilities';
import { url, port } from './server';

const URL = `http://${url}:${port}`;

const request = {
    finalGradesByGroup: (_, { groupId }) =>
        generalRequest(`${URL}/finalgrade/group/${groupId}`, 'GET'),
    finalGradesByStudent: (_, { studentName }) =>
        generalRequest(`${URL}/finalgrade/student/${studentName}`, 'GET'),
    finalGradesByGroupAndStudent: (_, { groupId, studentName }) =>
        generalRequest(`${URL}/finalgrade/student/${groupId}/${studentName}`, 'GET'),
    statsByGroup: (_, { groupId }) =>
        generalRequest(`${URL}/stats/${groupId}`, 'GET'),
    createFinalGrade: (_, { finalGradeInput }) =>
        generalRequest(`${URL}/finalgrade/save`, 'POST', finalGradeInput),
};

export default request