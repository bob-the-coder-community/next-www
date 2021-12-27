import React from "react";
import PrimaryLayout from '../components/layouts/PrimaryLayout';

const overviewPoints = [
	'5 Hours online live coding challenge to showcase your javascript skills.',
	'According to Stackoverflow 2021 survey, javascript is the most commonly used programming language.',
	'Flex your JS skills by participating in this 5 hours coding challenge.',
	'100+ problems, you pick what you want to solve, submit and earn score to be on top of the leaderboard.'
]
const hackathonProblems = [
	'The problems will be based on Arrays, Strings, Math, Sorting, Counting, Divide and conquer and others.',
	'Each problem will be tagged as easy, medium and hard. Points will be different for each problem based on complexity.',
	'There will be no time limits for problems, and submissions can be made only once for each problem.'
]

type Props = {}
type State = {
	hackathonDate: string,
}

class LandingPage extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			hackathonDate: '22nd January 2022', 
		}
	}

  	render(): JSX.Element {
		const {hackathonDate} = this.state
		return (
			<PrimaryLayout>
				<div className="landing-page ">
					<div className="row justify-content-center">
						<svg width="100vw" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="hackathon-intro-bg hackathon-bgs p-0">
							<path d="M 0,0 L 0,80 Q 50,100 100,80 L 100,0 Z"/>
						</svg>
						<div className="col-xl-10 col-lg-12">
							<div className="row">
								<div className="col-xl-5 col-lg-6 col-sm-6 hackathon-brief mt-5 pt-5 order-sm-5  p-5 p-sm-2">
									<small className="hackathon-date">{hackathonDate}</small>
									<h2 className="hackathon-title mt-5 pt-5"> Lorem ipsum dolor. </h2>
									<h5 className="hackthon-brief-desc mt-5"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur provident aliquid quo. Suscipit sit magni saepe voluptas assumenda mollitia accusantium?</h5>
									<button className="btn btn-primary mt-5">Register now</button>
								</div>
								<div className="col-xl-6 col-lg-6 col-sm-6 p-5 order-sm-1">
									<img className="hackathon-image" src="/images/hackathon-logo.png" alt="hackathon image" />
								</div>
							</div>
						</div>
					</div>
					<div className="row justify-content-center mt-5">
						<div className="col-10">
							<div className="row">
									<div className="col-xl-5 col-lg-6 col-sm-6 mt-5 pt-5 p-5 p-sm-2 hackathon-overview">
										<h2 className="mt-5 pt-5 hackathon-overview-title">Overview</h2>
										<ul className="landing-page-lists hackathon-overview-list mt-4">
											{
												overviewPoints.map( (point, index): JSX.Element => (
													<li key={index} className="mt-2">
														{point}
													</li>
												))
											}
										</ul>
										<div className="row justify-content-end">
											<h5 className="mt-5 hackathon-overview-perks col-10">Top 50 programmers get free t-shirt, soft bind book and two stickers (javascript and bobTheCoder).</h5>
										</div>
										<button className="btn btn-primary mt-5">Register now</button>
									</div>
									<div className="col-xl-6 col-lg-6 col-sm-6 p-5">
										<img className="hackathon-image" src="/images/hackathon-overview.png" alt="hackathon image" />
									</div>
							</div>
						</div>
					</div>
					<div className="row justify-content-center mb-5">
						<svg width="100vw" height="80%" viewBox="0 0 100 100" preserveAspectRatio="none" className="hackathon-bgs hackathon-problems-bg p-0">
							<path className="light" d="M 0,0 L 0,90 L 100,100 L 100,10 Z"/>
						</svg>
						<svg width="100vw" height="80%" viewBox="0 0 100 100" preserveAspectRatio="none" className="hackathon-bgs hackathon-problems-bg p-0">
							<path className="dark" d="M 0,10 L 0,100 L 100,90 L 100,0 Z"/>
						</svg>
						<div className="col-xl-10 col-lg-12">
							<div className="row">
								<div className="col-xl-5 col-lg-6 col-sm-6 hackathon-problems mt-5 pt-5 order-sm-5  p-5 p-sm-2">
									<h2 className="mt-5 pt-5 hackathon-problems-title">Problems</h2>
									<ul className="landing-page-lists hackathon-problems-list mt-4">
										{
											hackathonProblems.map( (problem, index): JSX.Element => (
												<li key={index} className="mt-2">
													{problem}
												</li>
											))
										}
									</ul>
								</div>
								<div className="col-xl-6 col-lg-6 col-sm-6 p-5 order-sm-1">
									<img className="hackathon-image" src="/images/hackathon-problems.png" alt="hackathon image" />
								</div>
							</div>
						</div>
					</div>
					<div className="row justify-content-center mt-5 mb-5">
						<div className="col-9">
							<div className="row mt-5 timeline">
								<h2 className="timeline-title mb-5">Timeline</h2>
								<div className="col-lg-3 col-sm-6 col-xs-12 mt-sm-5 timeline-events">
									<img src="/images/registration-open.png" alt="reg-open" className="mb-3 mt-5 mt-sm-5"/>
									<div className="event">
										<h4 className="event-name">Registration opens</h4>
										<h4 className="event-date">3rd Jan 2022</h4>
									</div>
								</div>
								<div className="col-lg-3 col-sm-6 col-xs-12 timeline-events">
									<img src="/images/registration-closed.png" alt="reg-closed" className="mb-3 mt-5 mt-sm-0"/>
									<div className="event">
										<h4 className="event-name">Registration closed</h4>
										<h4 className="event-date">11th Jan 2022</h4>
									</div>

								</div>
								<div className="col-lg-3  col-sm-6 col-xs-12 mt-sm-5 timeline-events">
									<img src="/images/sneak-peek.png" alt="sneak-peek" className="mb-3 mt-5 mt-sm-5"/>
									<div className="event">
										<h4 className="event-name">Sneak peek into problems</h4>
										<div className="event-date-time d-flex justify-content-between">
											<h4 className="event-date">22nd Jan 2022</h4>
											<h4>10:00AM</h4>
										</div>
									</div>
									<div className="event mt-2">
										<h4 className="event-name">Submissions and leaderboard opens</h4>
										<div className="event-date-time d-flex justify-content-between">
											<h4 className="event-date">22nd Jan 2022</h4>
											<h4>11:00AM</h4>
										</div>
									</div>
									<div className="event mt-2">
										<h4 className="event-name">Submission closes</h4>
										<div className="event-date-time d-flex justify-content-between">
											<h4 className="event-date">22nd Jan 2022</h4>
											<h4>3:00PM</h4>
										</div>
									</div>
								</div>
								<div className="col-lg-3 col-sm-6 col-xs-12 timeline-events">
									<img src="/images/winners.png" alt="winners" className="mb-3 mt-5 mt-sm-0"/>
									<div className="event">
										<h4 className="event-name">Winners announcements</h4>
										<div className="event-date-time d-flex justify-content-between">
											<h4 className="date">22nd Jan 2022</h4>
											<h4 className="time">7:00PM</h4>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row justify-content-center mb-5">
						<svg width="100vw" height="80%" viewBox="0 0 100 100" preserveAspectRatio="none" className="hackathon-bgs hackathon-problems-bg p-0">
							<path className="light" d="M 0,0 L 0,90 L 100,100 L 100,10 Z"/>
						</svg>
						<svg width="100vw" height="80%" viewBox="0 0 100 100" preserveAspectRatio="none" className="hackathon-bgs hackathon-problems-bg p-0">
							<path className="dark" d="M 0,10 L 0,100 L 100,90 L 100,0 Z"/>
						</svg>
						<div className="col-xl-6 col-xs-11 col-md-9 p-5">
							<div className="sponcers">
								<h2 className="text-center sponcers-title">Sponcers</h2>
								<div className="row sponcers-row mt-5">
									<div className="col-8 p-1">
										<div className="sponcer"></div>
									</div>
									<div className="col-4 p-1">
										<div className="sponcer"></div>
									</div>
									<div className="col-4 p-1">
										<div className="sponcer"></div>
									</div>
									<div className="col-8 p-1">
										<div className="sponcer"></div>
									</div>
								</div>
							</div>
							
						</div>
					</div>
					<div className="row justify-content-center mb-5">
						<div className="col-xl-6 col-xs-11 col-md-9 p-5">
							<div className="faqs">
								<h2 className="text-center faqs-title">Frequently Asked Questions</h2>
								<div className="faq-questions">
									
								</div>
							</div>
							
						</div>
					</div>
				</div>
			</PrimaryLayout>
		)
  	}
}

export default LandingPage