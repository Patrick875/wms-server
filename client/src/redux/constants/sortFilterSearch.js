export const allSubs = [
	"location",
	"catering",
	"cakes",
	"transport",
	"flowers",
	"decoration",
	"makeup",
	"haircuts",
	"hairstyles",
	"sound",
	"mc",
	"singer",
	"band",
	"Itorero",
	"Dj",
	"bridesmaids",
	"groomsmaids",
	"photography",
	"videography",
	"dress",
	"costumes",
	"shoe",
];
export const sortOptions = ["price(asc)", "price(desc)"];

export const filter = (products = [], filter, criteria) => {
	if (products && products.length !== 0) {
		if (criteria === "All" || !criteria) {
			return products;
		} else {
			return products.filter((product) =>
				product[filter] === criteria ? product : null
			);
		}
	} else {
		return [];
	}
};
export const sort = (products = [], criteria) => {
	if (products && products.length !== 0) {
		if (criteria === "price(asc)") {
			return products.sort(function (a, b) {
				return a.price - b.price;
			});
		} else if (criteria === "price(desc)") {
			return products.sort(function (a, b) {
				return b.price - a.price;
			});
		} else {
			return [...products];
		}
	} else {
		return [];
	}
};
