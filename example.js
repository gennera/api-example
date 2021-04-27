const axios = require("axios");

const send = async function (url, method, data) {
	return (await axios({
		url,
		method,
		headers: {
			"x-access-token": ""
		},
		data
	})).data;
}

const get = function (url) {
	return send(url, "get");
};

const post = function (url, data) {
	return send(url, "post", data);
};

(async function () {
	const url = "https://api2.gennera.com.br";
	const institutions = await get(`${url}/institutions`);
	for (let institution of institutions) {
		const campuses = await get(`${url}/institutions/${institution.idInstitution}/campuses`);
		institution = await get(`${url}/institutions/${institution.idInstitution}`);
		console.log(institution);
		const courses = await get(`${url}/institutions/${institution.idInstitution}/courses`);
		for (let course of courses) {
			course = await get(`${url}/institutions/${institution.idInstitution}/courses/${course.idCourse}`);
			console.log(course);
			let curriculums = await get(`${url}/institutions/${institution.idInstitution}/courses/${course.idCourse}/curriculums`);
			for (let curriculum of curriculums) {
				curriculum = await get(`${url}/institutions/${institution.idInstitution}/courses/${course.idCourse}/curriculums/${curriculum.idCurriculum}`);
				console.log(curriculum);
				let modules = await get(`${url}/institutions/${institution.idInstitution}/courses/${course.idCourse}/curriculums/${curriculum.idCurriculum}/modules`);
				for (let module of modules) {
					module = await get(`${url}/institutions/${institution.idInstitution}/courses/${course.idCourse}/curriculums/${curriculum.idCurriculum}/modules/${module.idModule}`);
					console.log(module);
					let subjects = await get(`${url}/institutions/${institution.idInstitution}/courses/${course.idCourse}/curriculums/${curriculum.idCurriculum}/modules/${module.idModule}/subjects`);
					for (let subject of subjects) {
						console.log(subject);
					}
				}
			}
		}
		const academicCalendars = await get(`${url}/institutions/${institution.idInstitution}/academicCalendars`);
		for (let academicCalendar of academicCalendars) {
			const campaigns = await get(`${url}/institutions/${institution.idInstitution}/academicCalendars/${academicCalendar.idAcademicCalendar}/campaigns`);
			academicCalendar = await get(`${url}/institutions/${institution.idInstitution}/academicCalendars/${academicCalendar.idAcademicCalendar}`);
			console.log(academicCalendar);
			const periods = await get(`${url}/institutions/${institution.idInstitution}/academicCalendars/${academicCalendar.idAcademicCalendar}/periods`);
			for (let period of periods) {
				period = await get(`${url}/institutions/${institution.idInstitution}/academicCalendars/${academicCalendar.idAcademicCalendar}/periods/${period.idPeriod}`);
				console.log(period);
			}
		}
		const curriculumOffers = await get(`${url}/institutions/${institution.idInstitution}/curriculumOffers`);
		for (let curriculumOffer of curriculumOffers) {
			curriculumOffer = await get(`${url}/institutions/${institution.idInstitution}/curriculumOffers/${curriculumOffer.idCurriculumOffer}`);
			const classes = await get(`${url}/institutions/${institution.idInstitution}/curriculumOffers/${curriculumOffer.idCurriculumOffer}/classes`);
			for (let clazz of classes) {
				clazz = await get(`${url}/institutions/${institution.idInstitution}/classes/${clazz.idClass}`);
				console.log(clazz);
				// Desligado para não deixar a execução do exemplo lenta
				// const students = await get(`${url}/institutions/${institution.idInstitution}/classes/${clazz.idClass}/students`);
				const professors = await get(`${url}/institutions/${institution.idInstitution}/classes/${clazz.idClass}/professors`);
				console.log(professors);
				let diaries = await get(`${url}/institutions/${institution.idInstitution}/classes/${clazz.idClass}/diaries`);
				for (let diary of diaries) {
					diary = await get(`${url}/institutions/${institution.idInstitution}/diaries/${diary.idDiary}`);
					// Desligado para não deixar a execução do examplo lenta
					// const students = await get(`${url}/institutions/${institution.idInstitution}/diaries/${diary.idDiary}/students`);
					// for (const student of students) {
					// 	const grades = await get(`${url}/institutions/${institution.idInstitution}/diaries/${diary.idDiary}/students/${student.idUser}/grades`);
					// 	const periodAverages = await get(`${url}/institutions/${institution.idInstitution}/diaries/${diary.idDiary}/students/${student.idUser}/periodAverages`);
					// 	const averages = await get(`${url}/institutions/${institution.idInstitution}/diaries/${diary.idDiary}/students/${student.idUser}/averages`);
					// }
					// const professors = await get(`${url}/institutions/${institution.idInstitution}/diaries/${diary.idDiary}/professors`);
					// const exams = await get(`${url}/institutions/${institution.idInstitution}/diaries/${diary.idDiary}/exams`);
					// const lessons = await get(`${url}/institutions/${institution.idInstitution}/diaries/${diary.idDiary}/lessons`);
				}
			}
		}
		// Desligado para não deixar a execução do exemplo lenta
		// const campaigns = await get(`${url}/institutions/${institution.idInstitution}/campaigns`);
		// for (let campaign of campaigns) {
		// 	campaign = await get(`${url}/institutions/${institution.idInstitution}/campaigns/${campaign.idCampaign}`);
		// 	const enrollments = await get(`${url}/institutions/${institution.idInstitution}/campaigns/${campaign.idCampaign}/enrollments`);
		// 	for (let enrollment of enrollments) {
		// 		enrollment = await get(`${url}/institutions/${institution.idInstitution}/enrollments/${enrollment.idEnrollment}`);
		// 		const contracts = await get(`${url}/institutions/${institution.idInstitution}/enrollments/${enrollment.idEnrollment}/contracts`);
		// 		for (const contract of contracts) {
		// 			const invoices = await get(`${url}/institutions/${institution.idInstitution}/contracts/${contract.idContract}/invoices`);
		// 			for (const invoice of invoices) {
		// 				const gatewayTransactions = await get(`${url}/institutions/${institution.idInstitution}/contracts/${contract.idContract}/invoices/${invoice.idInvoice}/gatewayTransactions`);
		// 			}
		// 		}
		// 		const enrollmentSubjects = await get(`${url}/institutions/${institution.idInstitution}/enrollments/${enrollment.idEnrollment}/subjects`);
		// 	}
		// }
		// const persons = await get(`${url}/institutions/${institution.idInstitution}/persons`);
		// for (let person of persons) {
		// 	person = await get(`${url}/institutions/${institution.idInstitution}/persons/${person.idPerson}`);
		// 	const relationships = await get(`${url}/institutions/${institution.idInstitution}/persons/${person.idPerson}/relationships`);
		// 	const enrollments = await get(`${url}/institutions/${institution.idInstitution}/persons/${person.idPerson}/enrollments`);
		// 	const enrollmentRecords = await get(`${url}/institutions/${institution.idInstitution}/persons/${person.idPerson}/enrollmentRecords`);
		// 	for (const enrollmentRecord of enrollmentRecords) {
		// 		console.log(enrollmentRecord);
		// 		const enrollmentSubjectRecords = await get(`${url}/institutions/${institution.idInstitution}/enrollmentRecords/${enrollmentRecord.idEnrollmentRecord}/subjects`);
		// 		console.log(enrollmentSubjectRecords);
		// 	}
		// }
	}
})();
