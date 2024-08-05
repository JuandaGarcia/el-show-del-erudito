import { SVGProps } from 'react'
import s from './PublicHelpChart.module.scss'

interface Props extends SVGProps<SVGSVGElement> {
	answer: string
}
const PublicHelpChart = ({ answer, ...props }: Props) => {
	return (
		<svg
			viewBox="0 0 454 600"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<rect x={2.5} y={2.5} width={449} height={595} rx={13.5} fill="#171724" />
			<rect
				x={2.5}
				y={2.5}
				width={449}
				height={595}
				rx={13.5}
				stroke="url(#paint0_linear_89_26988)"
				strokeWidth={5}
			/>
			<rect
				opacity={0.5}
				x={120}
				y={66}
				width={8}
				height={366}
				rx={4}
				fill="#454459"
			/>
			<rect
				opacity={0.5}
				x={259}
				y={66}
				width={8}
				height={366}
				rx={4}
				fill="#454459"
			/>
			<rect
				opacity={0.5}
				x={189}
				y={66}
				width={8}
				height={366}
				rx={4}
				fill="#454459"
			/>
			<rect
				opacity={0.5}
				x={329}
				y={66}
				width={8}
				height={366}
				rx={4}
				fill="#454459"
			/>
			<rect
				x={119}
				y={-435}
				width={10}
				height={
					answer === 'A' ? 96 : answer === 'B' ? 143 : answer === 'C' ? 96 : 336
				}
				rx={5}
				fill="url(#paint1_linear_89_26988)"
				className={s.line}
			/>
			<rect
				x={188}
				y={-435}
				width={10}
				height={
					answer === 'A' ? 143 : answer === 'B' ? 96 : answer === 'C' ? 336 : 96
				}
				rx={5}
				fill="url(#paint3_linear_89_26988)"
				className={s.line}
			/>
			<rect
				x={258}
				y={-435}
				width={10}
				height={
					answer === 'A' ? 49 : answer === 'B' ? 336 : answer === 'C' ? 49 : 143
				}
				rx={5}
				fill="url(#paint2_linear_89_26988)"
				className={s.line}
			/>
			<rect
				x={328}
				y={-435}
				width={10}
				height={
					answer === 'A' ? 336 : answer === 'B' ? 49 : answer === 'C' ? 143 : 49
				}
				rx={5}
				fill="url(#paint4_linear_89_26988)"
				className={s.line}
			/>
			<path
				d="M117.22 470.2H126.756L134.052 515H127.012L125.732 506.104V506.232H117.732L116.452 515H109.924L117.22 470.2ZM124.9 500.152L121.764 478.008H121.636L118.564 500.152H124.9Z"
				fill={answer === 'A' ? 'url(#paint5_linear_89_26988)' : 'white'}
			/>
			<path
				d="M181.687 470.2H192.311C195.937 470.2 198.583 471.053 200.247 472.76C201.911 474.424 202.743 477.005 202.743 480.504V482.296C202.743 484.6 202.359 486.477 201.591 487.928C200.865 489.379 199.735 490.424 198.199 491.064V491.192C201.697 492.387 203.447 495.501 203.447 500.536V504.376C203.447 507.832 202.529 510.477 200.695 512.312C198.903 514.104 196.257 515 192.759 515H181.687V470.2ZM191.479 488.44C192.887 488.44 193.932 488.077 194.615 487.352C195.34 486.627 195.703 485.411 195.703 483.704V481.208C195.703 479.587 195.404 478.413 194.807 477.688C194.252 476.963 193.356 476.6 192.119 476.6H188.727V488.44H191.479ZM192.759 508.6C193.996 508.6 194.913 508.28 195.51 507.64C196.108 506.957 196.407 505.805 196.407 504.184V500.28C196.407 498.232 196.044 496.824 195.319 496.056C194.636 495.245 193.484 494.84 191.863 494.84H188.727V508.6H192.759Z"
				fill={answer === 'B' ? 'url(#paint5_linear_89_26988)' : 'white'}
			/>
			<path
				d="M263.794 515.64C260.423 515.64 257.842 514.68 256.05 512.76C254.301 510.84 253.426 508.131 253.426 504.632V480.568C253.426 477.069 254.301 474.36 256.05 472.44C257.842 470.52 260.423 469.56 263.794 469.56C267.165 469.56 269.725 470.52 271.474 472.44C273.266 474.36 274.162 477.069 274.162 480.568V485.304H267.506V480.12C267.506 477.347 266.333 475.96 263.986 475.96C261.639 475.96 260.466 477.347 260.466 480.12V505.144C260.466 507.875 261.639 509.24 263.986 509.24C266.333 509.24 267.506 507.875 267.506 505.144V498.296H274.162V504.632C274.162 508.131 273.266 510.84 271.474 512.76C269.725 514.68 267.165 515.64 263.794 515.64Z"
				fill={answer === 'C' ? 'url(#paint5_linear_89_26988)' : 'white'}
			/>
			<path
				d="M321.624 470.2H332.376C335.875 470.2 338.499 471.139 340.248 473.016C341.997 474.893 342.872 477.645 342.872 481.272V503.928C342.872 507.555 341.997 510.307 340.248 512.184C338.499 514.061 335.875 515 332.376 515H321.624V470.2ZM332.248 508.6C333.4 508.6 334.275 508.259 334.872 507.576C335.512 506.893 335.832 505.784 335.832 504.248V480.952C335.832 479.416 335.512 478.307 334.872 477.624C334.275 476.941 333.4 476.6 332.248 476.6H328.664V508.6H332.248Z"
				fill={answer === 'D' ? 'url(#paint5_linear_89_26988)' : 'white'}
			/>
			<defs>
				<linearGradient
					id="paint0_linear_89_26988"
					x1={227}
					y1={0}
					x2={227}
					y2={600}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#99FFA3" />
					<stop offset={1} stopColor="#68EE76" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_89_26988"
					x1={124}
					y1={96}
					x2={124}
					y2={432}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#99FFA3" />
					<stop offset={1} stopColor="#68EE76" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_89_26988"
					x1={263}
					y1={383}
					x2={263}
					y2={432}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#99FFA3" />
					<stop offset={1} stopColor="#68EE76" />
				</linearGradient>
				<linearGradient
					id="paint3_linear_89_26988"
					x1={193}
					y1={289}
					x2={193}
					y2={432}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#99FFA3" />
					<stop offset={1} stopColor="#68EE76" />
				</linearGradient>
				<linearGradient
					id="paint4_linear_89_26988"
					x1={333}
					y1={336}
					x2={333}
					y2={432}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#99FFA3" />
					<stop offset={1} stopColor="#68EE76" />
				</linearGradient>
				<linearGradient
					id="paint5_linear_89_26988"
					x1={122}
					y1={457}
					x2={122}
					y2={534}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#99FFA3" />
					<stop offset={1} stopColor="#68EE76" />
				</linearGradient>
			</defs>
		</svg>
	)
}
export default PublicHelpChart
