function arrangeByRating(a, b) {
    return parseFloat(b.rating) - parseFloat(a.rating);
}

export default arrangeByRating