import ReactTimeAgo from "react-time-ago";

function RevenueTableItem({ product, cost, date }) {
	return (
		<tr>
			<td className="text-capitalize">{product}</td>
			<td className="fw-bold">{cost}</td>
			<td className="mx-1">{date}</td>
		</tr>
	);
}

export default function RevenueTable({ activatedOrders }) {
	return (
		<div className="table-area">
			<table className="responsive-table table table-borderless">
				<thead>
					<tr>
						<th>Product</th>
						<th>Cost</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{activatedOrders && activatedOrders.length !== 0 ? (
						activatedOrders.map((order) => (
							<RevenueTableItem
								product={order.product.name}
								cost={order.product.price * order.product.quantity}
								date={
									order.createdAt ? (
										<ReactTimeAgo
											date={new Date(order.createdAt).toLocaleString()}
											className="px-2"
										/>
									) : (
										"--"
									)
								}
							/>
						))
					) : (
						<p>No revenue yet</p>
					)}
				</tbody>
			</table>
		</div>
	);
}
