"use strict";

const rp = require("request-promise");
const cheerio = require("cheerio");

parseIt(40, {searchCon1: "이"},
	function success(results) {
		console.info("INFO", results, results.length);
	},
	function failure(error) {
		console.error("A fatal error occurred!");
	});


function parseIt(rowPerPage, query, successCallback, failureCallback)
{
/*
	// 먼저 학교 이름 설정(그 계정에 대하여 적용) ; GET
	http://reading.edurang.net/r/reading/search/schoolCodeSetting.jsp?schoolCode=751&returnUrl=
	// 쿠키 유지
	http://reading.edurang.net/r/reading/search/schoolSearchResult.jsp
	로
	다음과 같은 인수를 담아
	POST 요청을 보내면 됨
	currentPage:
		현재 페이지를 나타내는 자연수(1, 2, 3, ...)
	controlNo:
		비워 둠
	bookInfo:
		비워 둠
	boxCmd:
		비워 둠
	pageParamInfo:
		비워 둠
	prevPageInfo:
		비워 둠
	searchPageName:
		문자열 "schoolSearchForm"
	division1:
		전체 - ALL
		자료명 - TITL
		저자 - AUTH
		출판사 - PUBL
		주제 - SUBJ
		ISBN 또는 ISSN - ISBN
		KDCN - KDCN
	searchCon1:
		첫 번째 칸 내용
	connect1:
		‘그리고’는 ‘A’
		‘또는’는 ‘O’
		‘제외하고’는 ‘N’
	division2:
		전체 - ALL
		자료명 - TITL
		저자 - AUTH
		출판사 - PUBL
		주제 - SUBJ
		ISBN 또는 ISSN - ISBN
		KDCN - KDCN
	searchCon2:
		두 번째 칸 내용
	connect2:
		‘그리고’는 ‘A’
		‘또는’는 ‘O’
		‘제외하고’는 ‘N’
	division3:
		전체 - ALL
		자료명 - TITL
		저자 - AUTH
		출판사 - PUBL
		주제 - SUBJ
		ISBN 또는 ISSN - ISBN
		KDCN - KDCN
	searchCon3:
		세 번째 칸 내용
	dataType:
		전체 - ALL
		단행본 - MA
		연간물 - SE
		비도서 - NB
		장학 자료 - SM
		기타 자료 - OT
	lineSize:
		한 페이지당 몇 개의 책을 보여 줄 것인지 (10, 20, 30, 40 중 하나)
*/
	let fullQuery = {
			currentPage: "1",
			controlNo: "",
			bookInfo: "",
			boxCmd: "",
			searchPageName: "schoolSearchForm",
			pageParamInfo: "",

			division1: "ALL",
			searchCon1: "",

			connect1: "O",

			division2: "ALL",
			searchCon2: "",

			connect2: "O",

			division3: "ALL",
			searchCon3: "",

			dataType: "ALL",
			lineSize: `${rowPerPage}`
		};
	Object.assign(fullQuery, query);

	rp({
		jar: true,
		uri: "http://reading.edurang.net/r/reading/search/schoolCodeSetting.jsp?schoolCode=751"
	})
	.then(_ => {
		let results = [];

		rp({
			jar: true,
			method: "POST",
			uri: "http://reading.edurang.net/r/reading/search/schoolSearchResult.jsp",
			form: fullQuery
		})
		.then(function(body) {
			try
			{
				const $ = cheerio.load(body);
				const rowNumber = parseRowNumber($);
				results.push(...parseBookInfoFrom($));

				if((rowNumber / rowPerPage) > 1)
				{
					let requests = [];
					for(let pageNumber = Math.ceil(rowNumber / rowPerPage); pageNumber > 1; pageNumber--)
					{
						requests.push(rp({
							jar: true,
							method: "POST",
							uri: "http://reading.edurang.net/r/reading/search/schoolSearchResult.jsp",
							form: Object.assign(fullQuery, {currentPage: pageNumber})
						}).then(function(body) {
							const $$ = cheerio.load(body);
							results.push(...parseBookInfoFrom($$));
						}));
					}
					Promise.all(requests).then(_ => {
							successCallback(results);
						});
				}
				else
					successCallback(results);
			}
			catch(error)
			{
				throw error;
			}
		})
		.catch(function(error) {
			throw error;
		});
	})
	.catch(failureCallback);
}

function parseRowNumber($)
{
	try
	{
		return Number.parseInt($(".contents_c >.guide > span").text());
	}
	catch(error)
	{
		throw error;
	}
}

function parseBookInfoFrom($)
{
	let info = [];
	$(".dataList > table.result > tbody > tr")
		.each(function(index, element) {
				try
				{
					const thirdFieldMatches = /(\S+)\s+\(([0-9]{4})\)/m
						.exec($(this).find("td:nth-child(3)").text().trim());

					info.push({
						bookInfoID: Number.parseInt(/goDetail\('([0-9]+)'\);/.exec($(this).find(".left a").attr("onclick"))[1]),
						title: $(this).find("span.bold").text().trim(),
						author: $(this).find("td:nth-child(2)").text().trim().replace(/;/g, "; "),
						publisher: thirdFieldMatches[1],
						publishingYear: Number.parseInt(thirdFieldMatches[2]),
						bookCode: $(this).find("td:nth-child(4)").text().trim()
					});
				}
				catch(error)
				{
					console.error("ERROR", $(this).html(), error);
				}
		});
	return info;
}
