import React from "react";
import { NavLink } from "react-router-dom";
function Footer() {
	return (
		<div className="footer d-flex flex-column w-100 px-0 bg-light">
			<div className="row container py-2 my-2 d-flex flex-column flex-lg-row">
				<div className="col-4">
					<div className="mb-3">
						<h4>LOGO</h4>
					</div>
					<p>
						<NavLink className="nav-link p-0 text-dark" to="#">
							Privacy policy
						</NavLink>
					</p>
					<p>
						<NavLink className="nav-link p-0 text-dark" to="#">
							Order and Payment
						</NavLink>
					</p>
					<p>
						<NavLink className="nav-link p-0 text-dark" to="#">
							Contact us
						</NavLink>
					</p>
				</div>
				<div className="col-4">
					<p className="d-flex flex-row align-items-center">
						<i className="ri-mail-line ri-2x d-block me-3"></i> info@logo.com
						<NavLink className="nav-link text-dark " to="#"></NavLink>
					</p>
					<p className="d-flex flex-row align-items-center">
						<i className="ri-instagram-line ri-2x d-block "></i>

						<NavLink className="nav-link text-dark " to="#">
							Logo Weddings.com
						</NavLink>
					</p>
				</div>
				<div className="col col-lg-4 ">
					<p className="ms-lg-5 py-2">
						The data posted on the service is protected and confidential.
						Payment for services to suppliers is made through VISA Card and MTN
						Mobile Money, security .
					</p>
					<div className="row ">
						<svg
							className="col-3 ms-lg-5"
							width="80"
							height="80"
							viewBox="0 0 80 80"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<g clipPath="url(#clip0_59_706)">
								<path
									d="M3.2 14.88C1.43304 14.88 0 16.3126 0 18.08V61.92C0 63.6873 1.43376 65.12 3.2 65.12H76.8C78.567 65.12 80 63.6874 80 61.92V18.08C80 16.3127 78.5662 14.88 76.8 14.88H3.2ZM47.78 29.8525C49.727 29.8525 51.2874 30.2826 52.2825 30.6825L51.6025 34.96L51.1525 34.7325C50.2255 34.3326 49.0349 33.9477 47.3925 33.975C45.4264 33.975 44.5175 34.852 44.5175 35.6726C44.5061 36.5971 45.5795 37.2069 47.335 38.12C50.2323 39.5288 51.5714 41.237 51.5526 43.4825C51.5135 47.5798 48.0866 50.2275 42.8075 50.2275C40.5553 50.2027 38.3854 49.7259 37.2125 49.175L37.9175 44.755L38.565 45.07C40.2144 45.807 41.2824 46.105 43.2925 46.105C44.7359 46.105 46.2852 45.5006 46.2975 44.1775C46.3069 43.3135 45.6499 42.6975 43.695 41.73C41.79 40.7857 39.2646 39.2038 39.2926 36.3675C39.3223 32.5306 42.8176 29.8525 47.78 29.8525ZM7.07496 30.48H15.1825C16.2742 30.5213 17.1557 30.8728 17.46 32.0575L19.2075 41.0775C19.2078 41.0783 19.2072 41.0816 19.2075 41.0825L19.7325 43.785L24.655 30.48H29.98L22.065 49.955L16.745 49.96L12.51 34.245C15.0298 35.5799 17.1751 37.1245 18.4175 39.25C18.0972 38.5774 17.6751 37.8182 17.135 37.07C16.5061 36.1986 15.1478 35.0736 14.58 34.595C12.6016 32.9272 9.9148 31.5802 7.01248 30.8675L7.07496 30.48ZM32.0975 30.5025H37.305L34.0474 49.9475H28.84L32.0975 30.5025ZM61.51 30.5025H65.455L69.585 49.9475H64.85C64.85 49.9475 64.3802 47.7136 64.2275 47.0325C63.4833 47.0325 58.2782 47.025 57.6925 47.025C57.4943 47.5514 56.6175 49.9474 56.6175 49.9474H51.26L58.8375 32.1175C59.374 30.8505 60.2885 30.5025 61.51 30.5025ZM61.8975 35.7325C61.6413 36.4558 61.1951 37.6238 61.225 37.5725C61.225 37.5725 59.622 41.8477 59.2026 42.9575L63.415 42.955C63.212 41.9908 62.24 37.3926 62.24 37.3926L61.8975 35.7326V35.7325Z"
									fill="#2A324B"
								/>
							</g>
							<defs>
								<clipPath id="clip0_59_706">
									<rect width="80" height="80" fill="white" />
								</clipPath>
							</defs>
						</svg>
						<p className="ms-lg-5 ">
							Through{" "}
							<a
								className=" text-black "
								target="_blank"
								href="https://stripe.com/"
								rel="noreferrer">
								stripe
							</a>
						</p>
					</div>
				</div>
			</div>
			<div className="footer-bottom bg-dark text-white text-md-center py-3 mt-3">
				<p>Copyright LOGO 2022, All rights reserved</p>
			</div>
		</div>
	);
}

export default Footer;

// <div className="footer d-flex flex-column w-100 px-0  bg-light">
// 	<div className="row container py-2 my-2">
// 		<div className="col-4">
// 			<div>
// 				<h4>LOGO</h4>
// 			</div>
// 			<p>
// 				<NavLink className="nav-link p-0 text-dark" to="#">
// 					Privacy policy
// 				</NavLink>
// 			</p>
// 			<p>
// 				<NavLink className="nav-link p-0 text-dark" to="#">
// 					Order and Payment
// 				</NavLink>
// 			</p>
// 			<p>
// 				<NavLink className="nav-link p-0 text-dark" to="#">
// 					Contact us
// 				</NavLink>
// 			</p>
// 		</div>
// 		<div className="col-4">
// 			<p className="d-flex flex-row align-items-center">
// 				<svg
// 					width="30"
// 					height="30"
// 					viewBox="0 0 30 30"
// 					fill="none"
// 					xmlns="http://www.w3.org/2000/svg">
// 					<path
// 						d="M26.25 5.625H3.75C3.25272 5.625 2.77581 5.82254 2.42417 6.17417C2.07254 6.52581 1.875 7.00272 1.875 7.5V22.5C1.875 22.9973 2.07254 23.4742 2.42417 23.8258C2.77581 24.1775 3.25272 24.375 3.75 24.375H26.25C26.7473 24.375 27.2242 24.1775 27.5758 23.8258C27.9275 23.4742 28.125 22.9973 28.125 22.5V7.5C28.125 7.00272 27.9275 6.52581 27.5758 6.17417C27.2242 5.82254 26.7473 5.625 26.25 5.625ZM24.1875 7.5L15 13.8562L5.8125 7.5H24.1875ZM3.75 22.5V8.35312L14.4656 15.7687C14.6226 15.8776 14.809 15.936 15 15.936C15.191 15.936 15.3774 15.8776 15.5344 15.7687L26.25 8.35312V22.5H3.75Z"
// 						fill="#2A324B"
// 					/>
// 				</svg>

// 				<NavLink className="nav-link text-dark " to="#">
// 					info@logo.com
// 				</NavLink>
// 			</p>
// 			<p className="d-flex flex-row align-items-center">
// 				<svg
// 					width="30"
// 					height="30"
// 					viewBox="0 0 30 30"
// 					fill="none"
// 					xmlns="http://www.w3.org/2000/svg">
// 					<path
// 						fill-rule="evenodd"
// 						clip-rule="evenodd"
// 						d="M9.33125 1.3325C10.7975 1.265 11.265 1.25 15 1.25C18.735 1.25 19.2025 1.26625 20.6675 1.3325C22.1325 1.39875 23.1325 1.6325 24.0075 1.97125C24.9237 2.3175 25.755 2.85875 26.4425 3.55875C27.1425 4.245 27.6825 5.075 28.0275 5.9925C28.3675 6.8675 28.6 7.8675 28.6675 9.33C28.735 10.7987 28.75 11.2662 28.75 15C28.75 18.735 28.7337 19.2025 28.6675 20.6688C28.6012 22.1313 28.3675 23.1313 28.0275 24.0063C27.6825 24.9239 27.1416 25.7552 26.4425 26.4425C25.755 27.1425 24.9237 27.6825 24.0075 28.0275C23.1325 28.3675 22.1325 28.6 20.67 28.6675C19.2025 28.735 18.735 28.75 15 28.75C11.265 28.75 10.7975 28.7337 9.33125 28.6675C7.86875 28.6012 6.86875 28.3675 5.99375 28.0275C5.07615 27.6825 4.24478 27.1416 3.5575 26.4425C2.85797 25.7558 2.31664 24.9249 1.97125 24.0075C1.6325 23.1325 1.4 22.1325 1.3325 20.67C1.265 19.2013 1.25 18.7337 1.25 15C1.25 11.265 1.26625 10.7975 1.3325 9.3325C1.39875 7.8675 1.6325 6.8675 1.97125 5.9925C2.31715 5.0751 2.8589 4.24414 3.55875 3.5575C4.24505 2.85813 5.07559 2.3168 5.9925 1.97125C6.8675 1.6325 7.8675 1.4 9.33 1.3325H9.33125ZM20.5562 3.8075C19.1062 3.74125 18.6712 3.7275 15 3.7275C11.3287 3.7275 10.8938 3.74125 9.44375 3.8075C8.1025 3.86875 7.375 4.0925 6.89 4.28125C6.24875 4.53125 5.79 4.8275 5.30875 5.30875C4.85256 5.75256 4.50148 6.29285 4.28125 6.89C4.0925 7.375 3.86875 8.1025 3.8075 9.44375C3.74125 10.8938 3.7275 11.3287 3.7275 15C3.7275 18.6712 3.74125 19.1062 3.8075 20.5562C3.86875 21.8975 4.0925 22.625 4.28125 23.11C4.50125 23.7063 4.8525 24.2475 5.30875 24.6912C5.7525 25.1475 6.29375 25.4988 6.89 25.7188C7.375 25.9075 8.1025 26.1313 9.44375 26.1925C10.8938 26.2588 11.3275 26.2725 15 26.2725C18.6725 26.2725 19.1062 26.2588 20.5562 26.1925C21.8975 26.1313 22.625 25.9075 23.11 25.7188C23.7513 25.4688 24.21 25.1725 24.6912 24.6912C25.1475 24.2475 25.4988 23.7063 25.7188 23.11C25.9075 22.625 26.1313 21.8975 26.1925 20.5562C26.2588 19.1062 26.2725 18.6712 26.2725 15C26.2725 11.3287 26.2588 10.8938 26.1925 9.44375C26.1313 8.1025 25.9075 7.375 25.7188 6.89C25.4688 6.24875 25.1725 5.79 24.6912 5.30875C24.2474 4.85259 23.7071 4.50151 23.11 4.28125C22.625 4.0925 21.8975 3.86875 20.5562 3.8075ZM13.2438 19.2388C14.2246 19.647 15.3167 19.7021 16.3337 19.3947C17.3506 19.0872 18.2292 18.4361 18.8195 17.5528C19.4098 16.6695 19.6751 15.6086 19.5701 14.5514C19.465 13.4942 18.9963 12.5062 18.2437 11.7562C17.764 11.2768 17.184 10.9098 16.5454 10.6814C15.9068 10.4531 15.2255 10.3692 14.5506 10.4358C13.8757 10.5023 13.2239 10.7177 12.6423 11.0664C12.0606 11.4151 11.5634 11.8884 11.1866 12.4523C10.8098 13.0162 10.5627 13.6566 10.4631 14.3275C10.3636 14.9983 10.4139 15.6829 10.6107 16.3319C10.8074 16.9809 11.1456 17.5783 11.6009 18.0809C12.0562 18.5835 12.6173 18.979 13.2438 19.2388ZM10.0025 10.0025C10.6588 9.34622 11.4379 8.82563 12.2954 8.47045C13.1528 8.11527 14.0719 7.93247 15 7.93247C15.9281 7.93247 16.8472 8.11527 17.7046 8.47045C18.5621 8.82563 19.3412 9.34622 19.9975 10.0025C20.6538 10.6588 21.1744 11.4379 21.5295 12.2954C21.8847 13.1528 22.0675 14.0719 22.0675 15C22.0675 15.9281 21.8847 16.8472 21.5295 17.7046C21.1744 18.5621 20.6538 19.3412 19.9975 19.9975C18.6721 21.3229 16.8744 22.0675 15 22.0675C13.1256 22.0675 11.3279 21.3229 10.0025 19.9975C8.67708 18.6721 7.93247 16.8744 7.93247 15C7.93247 13.1256 8.67708 11.3279 10.0025 10.0025ZM23.635 8.985C23.7976 8.83159 23.9278 8.6471 24.0179 8.44247C24.1079 8.23783 24.156 8.01721 24.1593 7.79366C24.1625 7.57011 24.1209 7.34818 24.0369 7.14101C23.9528 6.93384 23.828 6.74564 23.67 6.58755C23.5119 6.42946 23.3237 6.3047 23.1165 6.22065C22.9093 6.1366 22.6874 6.09497 22.4638 6.09823C22.2403 6.10149 22.0197 6.14957 21.815 6.23962C21.6104 6.32967 21.4259 6.45987 21.2725 6.6225C20.9741 6.93879 20.8108 7.3589 20.8171 7.79366C20.8235 8.22842 20.999 8.6436 21.3064 8.95105C21.6139 9.25851 22.0291 9.43404 22.4638 9.44037C22.8986 9.44671 23.3187 9.28336 23.635 8.985Z"
// 						fill="#2A324B"
// 					/>
// 				</svg>

// 				<NavLink className="nav-link text-dark " to="#">
// 					Logo Weddings.com
// 				</NavLink>
// 			</p>
// 		</div>
// 		<div className="col-4">
// 			<p className="ms-5 bg-black">
// 				The data posted on the service is protected and confidential. Payment
// 				for services to suppliers is made through VISA Card and MTN Mobile
// 				Money, security .
// 			</p>
// 			<div className="row d-flex flex-row justify-content-between">
// 				<svg
// 					className="col"
// 					width="80"
// 					height="80"
// 					viewBox="0 0 80 80"
// 					fill="none"
// 					xmlns="http://www.w3.org/2000/svg">
// 					<g clip-path="url(#clip0_59_706)">
// 						<path
// 							d="M3.2 14.88C1.43304 14.88 0 16.3126 0 18.08V61.92C0 63.6873 1.43376 65.12 3.2 65.12H76.8C78.567 65.12 80 63.6874 80 61.92V18.08C80 16.3127 78.5662 14.88 76.8 14.88H3.2ZM47.78 29.8525C49.727 29.8525 51.2874 30.2826 52.2825 30.6825L51.6025 34.96L51.1525 34.7325C50.2255 34.3326 49.0349 33.9477 47.3925 33.975C45.4264 33.975 44.5175 34.852 44.5175 35.6726C44.5061 36.5971 45.5795 37.2069 47.335 38.12C50.2323 39.5288 51.5714 41.237 51.5526 43.4825C51.5135 47.5798 48.0866 50.2275 42.8075 50.2275C40.5553 50.2027 38.3854 49.7259 37.2125 49.175L37.9175 44.755L38.565 45.07C40.2144 45.807 41.2824 46.105 43.2925 46.105C44.7359 46.105 46.2852 45.5006 46.2975 44.1775C46.3069 43.3135 45.6499 42.6975 43.695 41.73C41.79 40.7857 39.2646 39.2038 39.2926 36.3675C39.3223 32.5306 42.8176 29.8525 47.78 29.8525ZM7.07496 30.48H15.1825C16.2742 30.5213 17.1557 30.8728 17.46 32.0575L19.2075 41.0775C19.2078 41.0783 19.2072 41.0816 19.2075 41.0825L19.7325 43.785L24.655 30.48H29.98L22.065 49.955L16.745 49.96L12.51 34.245C15.0298 35.5799 17.1751 37.1245 18.4175 39.25C18.0972 38.5774 17.6751 37.8182 17.135 37.07C16.5061 36.1986 15.1478 35.0736 14.58 34.595C12.6016 32.9272 9.9148 31.5802 7.01248 30.8675L7.07496 30.48ZM32.0975 30.5025H37.305L34.0474 49.9475H28.84L32.0975 30.5025ZM61.51 30.5025H65.455L69.585 49.9475H64.85C64.85 49.9475 64.3802 47.7136 64.2275 47.0325C63.4833 47.0325 58.2782 47.025 57.6925 47.025C57.4943 47.5514 56.6175 49.9474 56.6175 49.9474H51.26L58.8375 32.1175C59.374 30.8505 60.2885 30.5025 61.51 30.5025ZM61.8975 35.7325C61.6413 36.4558 61.1951 37.6238 61.225 37.5725C61.225 37.5725 59.622 41.8477 59.2026 42.9575L63.415 42.955C63.212 41.9908 62.24 37.3926 62.24 37.3926L61.8975 35.7326V35.7325Z"
// 							fill="#2A324B"
// 						/>
// 					</g>
// 					<defs>
// 						<clipPath id="clip0_59_706">
// 							<rect width="80" height="80" fill="white" />
// 						</clipPath>
// 					</defs>
// 				</svg>
// 				<MomoLogo className="col" />
// 			</div>
// 		</div>
// 	</div>
// 	<div className="footer-bottom bg-dark text-white text-center ">
// 		<p className="">Copyright LOGO 2022, All rights reserved</p>
// 	</div>
// </div>;

// <svg
// 							width="30"
// 							height="30"
// 							viewBox="0 0 30 30"
// 							fill="none"
// 							xmlns="http://www.w3.org/2000/svg">
// 							<path
// 								d="M26.25 5.625H3.75C3.25272 5.625 2.77581 5.82254 2.42417 6.17417C2.07254 6.52581 1.875 7.00272 1.875 7.5V22.5C1.875 22.9973 2.07254 23.4742 2.42417 23.8258C2.77581 24.1775 3.25272 24.375 3.75 24.375H26.25C26.7473 24.375 27.2242 24.1775 27.5758 23.8258C27.9275 23.4742 28.125 22.9973 28.125 22.5V7.5C28.125 7.00272 27.9275 6.52581 27.5758 6.17417C27.2242 5.82254 26.7473 5.625 26.25 5.625ZM24.1875 7.5L15 13.8562L5.8125 7.5H24.1875ZM3.75 22.5V8.35312L14.4656 15.7687C14.6226 15.8776 14.809 15.936 15 15.936C15.191 15.936 15.3774 15.8776 15.5344 15.7687L26.25 8.35312V22.5H3.75Z"
// 								fill="#2A324B"
// 							/>
// 						</svg>
