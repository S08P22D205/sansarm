# ✔️ Project: 산삶

![산삶로고](./uploads/imgs/sansam_logo.png)

## 🎤 산삶 소개

"오늘은 어떤 등산 코스로 가볼까?"  
"나에게 편안한 등산 코스는 어디일까?"  
"이 코스를 등반하는데에 얼마나 걸릴까?"  
"나랑 비슷한 사람들은 어떤 코스를 주로 이용할까?"  

사용자 맞춤 등산코스 추천 서비스, "산삶"

지금 만나보세요!

__[산삶 체험하기 링크](https://j8d205.p.ssafy.io/)__

## 📆 개발 기간

2023.02.27 ~ 2023.04.07

## 🔍 주요 기능

1. 산별, 지역별, 현재 위치 기반 등산 코스 필터링
2. 사용자의 연령, 성별, 체감 난이도별 등산 코스 추천 서비스
3. 개인 등산 기록 마이페이지 제공
4. 개인 등산 기록을 실시간 반영하여 클러스터링을 통한 추천 정확도 향상  

## 📃 목차

1. [산삶 이용 방법](#산삶-이용-방법)
2. [팀원 및 담당 파트](#팀원-및-담당-파트)
3. [기술 스택](#기술-스택)
4. [시스템 아키텍쳐](#시스템-아키텍쳐)
5. [기타 문서](#기타-문서)

## 👀 산삶 이용 방법

#### 시작화면

![시작화면](./uploads/imgs/starting_page.gif)  

#### 로그인

![로그인](./uploads/imgs/login.png)

- 카카오 소셜로그인
  
  - 첫 로그인 시 : 회원가입 처리 후 자체 토큰 발행, 로그인 후 메인페이지로 redirect
  
  - 첫 로그인이 아닐 경우 : 로그인 후 메인페이지로 redirect

#### 메인페이지

![메인화면](./uploads/imgs/gif_1.gif)  

- 사용자의 연령과 성별에 따른 추천

- 사용자의 체감 난이도가 쉬움, 중간, 어려움에 해당하는 코스 추천

![top 10 추천](./uploads/imgs/gif_2.gif)

- TOP 10 추천코스(리뷰 갯수 기준)

#### 산으로 추천받기

![산으로 추천받기 화면-지리산](./uploads/imgs/gif_4.gif)

- 메인페이지 내 검색창에 산 이름 입력 시 해당 산 이름 입력된 상태로 이동

- 메인페이지 내 산으로 추천받기 버튼 클릭 시 이동

- 산 이름, 산행 시간, 코스 길이 선택 후 조건에 맞는 코스 출력

#### 지역으로 추천받기

![지역으로 추천받기 화면-서울](./uploads/imgs/gif_5.gif)

- 지역검색 :  행정구역(서울, 부산 등) 기준으로 코스 필터링

- 현재위치 : 현재 사용자 위치 기준 반경 nkm 떨어진 코스 필터링

- 산행 시간, 코스 길이는 '산으로 추천받기' 페이지와 동일

#### 코스 상세페이지

![코스 세부 화면-지리산 1번코스](./uploads/imgs/gif_6.gif)

- 메인페이지, 산/지역으로 추천받기 내 카드 클릭 시 해당 페이지로 이동

- 코스 관련 디테일(지도, 길이, 상/하행 시간, 사람들의 리뷰 및 난이도 평가) 표시

- 코스 찜하기 → 마이페이지 내 찜목록에서 확인 가능

#### 등산 중 화면

![등산 중 화면-지리산 1번코스](./uploads/imgs/gif_8.gif)

- 등산 중인 코스 정보(코스 이름, 경로) 표시

- 등산 소요 시간 표시 → 분 단위로 기록되어 마이페이지 내 타임라인에서 확인 가능

- 사용자의 위치 및 실제 경로 표시(지도 내 초록색 선으로 표시됨)

- 사진 촬영 페이지 이동 버튼

#### 등산 중 사진 촬영 페이지

![등산 중 사진 촬영 화면](./uploads/imgs/hiking_camera.png)

- 카메라 버튼 클릭 시 모바일 기기에 내장된 카메라로 사진 촬영 후 기기 내 갤러리에 저장 

- '카메라 끄기' 버튼 클릭 시 등산 중 페이지로 돌아감
  
  - 소요시간과 사용자의 경로는 그대로 저장되어 있음

#### 등산 완료 후 리뷰 기록 화면

![등산 완료 후 기록 화면](./uploads/imgs/gif_10.gif)

#### 마이페이지

![마이페이지-등산 기록](./uploads/imgs/gif_11.gif)

- 등산 타임라인 : 사용자가 다녀온 코스 목록 리뷰와 함께 표시

- 찜 목록 : 찜한 코스 목록 표시

- 등산 지도 : 사용자가 다녀온 코스 지도에서 한눈에 보기 

## 💻 팀원 및 담당 파트

- 김성욱(팀장/Back End)
- 김유홍(팀원/Front End)
- 양동기(팀원/Back End)
- 윤선영(팀원/Front End)
- 이아현(팀원/Front End)
- 이진우(팀원/Front End)

## 📚 기술 스택

- Front End  
  ![React](https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=black)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=black)
  ![Redux](https://img.shields.io/badge/Redux-764ABC?logo=Redux&logoColor=black)
  ![NodeJS](https://img.shields.io/badge/Node.js-339933?logo=Node.js&logoColor=black)
- Back End  
  ![Java](https://img.shields.io/badge/Java-007396?logo=Java&logoColor=white)
  ![Spring Boot](https://img.shields.io/badge/Spring&nbsp;Boot-6DB33F?logo=SpringBoot&logoColor=darkgreen)
  ![Flask](https://img.shields.io/badge/Flask-000000?logo=Flask&logoColor=white)
  ![MariaDB](https://img.shields.io/badge/MariaDB-003545?logo=MariaDB&logoColor=white)
  ![Spring Boot Data JPA](https://img.shields.io/badge/SpringBoot&nbsp;Data&nbsp;JPA-6DB33F?logo=jpa&logoColor=darkgreen)
  ![JWT](https://img.shields.io/badge/JWT-000000?logo=JWT&logoColor=black)
  ![OAuth2.0](https://img.shields.io/badge/OAuth2.0-000000?logo=oauth&logoColor=white)
  ![Spring Security](https://img.shields.io/badge/Spring&nbsp;Security-6DB33F?logo=SpringSecurity&logoColor=black)
- Infra  
  ![Jenkins](https://img.shields.io/badge/Jenkins-D24939?logo=Jenkins&logoColor=black)
  ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=Docker&logoColor=black)
  ![Nginx](https://img.shields.io/badge/NGINX-009639?logo=NGINX&logoColor=white)
  ![AWS EC2](https://img.shields.io/badge/Amazon&nbsp;EC2-FF9900?logo=AmazonEC2&logoColor=black)

## 🔨 시스템 아키텍쳐

![아키텍쳐](./uploads/imgs/architecture.png)

## ✔️ 기타 문서

### 🎨 ERD

![ERD](./uploads/imgs/erd_specification.png)

### 💡 API 명세서

![API 명세서](./uploads/imgs/api_specification.png)

## 💪 협업툴

- 형상 관리: ![GitLab](https://img.shields.io/badge/GitLab-FC6D26?logo=GitLab)
- 이슈 관리: ![Jira](https://img.shields.io/badge/Jira-0052CC?logo=Jira)
- 커뮤니케이션:
  ![Mattermost](https://img.shields.io/badge/Mattermost-0058CC?logo=Mattermost&logoColor=black)
  ![Webex](https://img.shields.io/badge/WebEx-000000?logo=webex&logoColor=white)
  ![Notion](https://img.shields.io/badge/Notion-000000?logo=Notion&logoColor=white)
- 와이어프레임(UI/UX):
  ![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=Figma&logoColor=white)
