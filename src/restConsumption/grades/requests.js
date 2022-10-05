import { generalRequest, getRequest } from '../../utilities';
import { url, port } from './server';

const URL = `http://${url}:${port}`;

const requests = {
    classListDetails: (_, { id }) =>
        generalRequest(`${URL}/class/${id}`, 'GET'),

    getTasks: (_, { classId, teacherId }) =>
        generalRequest(`${URL}/class/${classId}/getTasks/${teacherId}`, 'GET'),

    getSchedule: (_, { info }) =>
        generalRequest(`${URL}/schedule/teacher`, 'GET', info),

    createClassList: (_, { classList }) =>
        generalRequest(`${URL}/addClass`, 'POST', classList),

    updateClassList: (_, { id, classList }) =>
        generalRequest(`${URL}/class/${id}/edit`, 'PUT', classList),

    deleteClassList: (_, { id }) =>
        generalRequest(`${URL}/class/${id}/delete`, 'DELETE'),

    enrollStudent: (_, { student }) =>
        generalRequest(`${URL}/addStudent`, 'POST', student),

    updateStudent: (_, { id, student }) =>
        generalRequest(`${URL}/editStudent/${id}`, 'PUT', student),

    removeStudent: (_, { id, classId }) =>
        generalRequest(`${URL}/class/${classId}/student/${id}/remove`, 'DELETE'),

    addTeacher: (_, { classId, teacher }) =>
        generalRequest(`${URL}/class/addTeacher/${classId}`, 'POST', teacher),

    updateTeacher: (_, { id, classId, teacher }) =>
        generalRequest(`${URL}/class/${classId}/teacher/${id}/edit`, 'PUT', teacher),

    removeTeacher: (_, { id, classId }) =>
        generalRequest(`${URL}/class/${classId}/teacher/${id}/remove`, 'DELETE'),

    createTasks: (_, { classId, tasks }) =>
        generalRequest(`${URL}/class/${classId}/addTasks`, 'POST', tasks),

    updateTask: (_, { id, task }) =>
        generalRequest(`${URL}/editTask/${id}`, 'PUT', task),

    deleteTasks: (_, { classId }) =>
        generalRequest(`${URL}/class/${classId}/deleteTasks`, 'DELETE'),

    addAbsences: (_, { classId, studentId, absences }) =>
        generalRequest(`${URL}/class/${classId}/student/${studentId}/addAbsences`, 'PUT', absences),

    approval: (_, { classId, studentId, grade }) =>
        generalRequest(`${URL}/class/${classId}/student/${studentId}/grade`, 'PUT', grade),

    addGrade: (_, { classId, studentId, taskId, grade }) =>
        generalRequest(`${URL}/class/${classId}/student/${studentId}/grade/${taskId}`, 'POST', grade),

    editGrade: (_, { classId, studentId, taskId, grade }) =>
        generalRequest(`${URL}/class/${classId}/student/${studentId}/grade/${taskId}`, 'PUT', grade),
};

export default requests;