//jshint esversion:9
import React from "react";
import { useRouteMatch } from "react-router-dom";
import { allSubs, sortOptions } from "../../redux/constants/sortFilterSearch";

function AdminTopNav({ getSearch, getFilter, getSort }) {
	const { url } = useRouteMatch();
	const itemCategory = url.replace("/admin/", "");

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid my-0 shadow-lg">
				<div
					className=" collapse navbar-collapse row justify-content-between"
					id="navbarSupportedContent">
					<form className="d-flex col-5">
						<input
							className="form-control me-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
							aria-describedby="basic-addon2"
							onChange={(e) => getSearch(e.target.value, itemCategory)}
						/>
						<span className="input-group-text" id="basic-addon2">
							<i
								className="ri-search-2-line ri-lg"
								role="button"
								type="submit"
							/>
						</span>
					</form>
					<ul className="mb-2 mb-lg-0 col-5 d-flex flex-row  align-items-center list-group-flush">
						<li className="list- align-items-start list-group-item">
							<div className=" row justify-content-end">
								<div className="col row d-flex flex-row align-content-center">
									<label className="form-label col pt-1 fw-bolder text-muted">
										Subcategory
									</label>
									<select
										className="form-select col "
										aria-label="Default select example"
										onChange={(e) => {
											getFilter(e.target.value);
										}}>
										<option selected>All</option>
										{allSubs.map((sub, i) => (
											<option key={i}>{sub}</option>
										))}
									</select>
								</div>

								<div className="col-5 row">
									<label className="form-label d-block col pt-1 fw-bolder text-muted">
										Sort
									</label>
									<select
										className="form-select dropdown col"
										aria-label="Default select example"
										onChange={(e) => {
											getSort(e.target.value);
										}}>
										<option selected className="dropdown-item">
											All
										</option>
										{sortOptions.map((option) => (
											<option value={option}>{option}</option>
										))}
									</select>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default AdminTopNav;
