export default function AdminLoading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card bg-base-200 shadow-xl animate-pulse">
            <div className="card-body">
              <div className="h-6 bg-base-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-base-300 rounded w-2/3"></div>
              <div className="card-actions justify-end mt-4">
                <div className="h-10 bg-base-300 rounded w-32"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 