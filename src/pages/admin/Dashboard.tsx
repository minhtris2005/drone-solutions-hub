import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { LogOut, BookOpen, TrendingUp, Calendar, Eye, Edit, FileText, Users, BarChart, Clock, EyeOff, Plus, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { supabase } from "@/services/supabase"
import { BlogPost } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { BlogForm } from "@/components/admin/BlogForm" // Thêm import BlogForm
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog" // Thêm import Dialog
interface DashboardStats {
  totalPosts: number
  totalPublished: number
  totalDrafts: number
  totalViews: number
  avgViews: number
  topCategory: string
  recentActivity: number
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalPublished: 0,
    totalDrafts: 0,
    totalViews: 0,
    avgViews: 0,
    topCategory: 'Chưa có',
    recentActivity: 0
  })
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<{name: string, count: number}[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch all posts
      const { data: allPosts } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      // Calculate stats
      const totalPosts = allPosts?.length || 0
      const publishedPosts = allPosts?.filter(p => p.status === 'published') || []
      const draftPosts = allPosts?.filter(p => p.status === 'draft') || []
      const totalViews = publishedPosts.reduce((sum, post) => sum + (post.views || 0), 0)
      const avgViews = publishedPosts.length > 0 ? Math.round(totalViews / publishedPosts.length) : 0

      // Get category stats
      const categoryMap = new Map<string, number>()
      allPosts?.forEach(post => {
        const count = categoryMap.get(post.category) || 0
        categoryMap.set(post.category, count + 1)
      })
      
      const categoryArray = Array.from(categoryMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)

      // Get top category
      const topCategory = categoryArray.length > 0 ? categoryArray[0].name : 'Chưa có'

      // Get recent activity (posts created in last 7 days)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      const recentActivity = allPosts?.filter(post => 
        new Date(post.created_at) > weekAgo
      ).length || 0

      // Get recent posts (last 5)
      const recentPostsData = allPosts?.slice(0, 5) || []

      // Get popular posts (by views)
      const popularPostsData = publishedPosts
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 3)

      setStats({
        totalPosts,
        totalPublished: publishedPosts.length,
        totalDrafts: draftPosts.length,
        totalViews,
        avgViews,
        topCategory,
        recentActivity
      })

      setRecentPosts(recentPostsData)
      setPopularPosts(popularPostsData)
      setCategories(categoryArray)

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }
    // Thêm vào trong component, sau các state
    const handleFormSuccess = () => {
      setShowForm(false)
      fetchDashboardData() // Gọi lại để cập nhật thống kê
    }
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `${diffInHours} giờ trước`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} ngày trước`
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Đang tải dữ liệu...</p>
              <p className="text-sm text-gray-500 mt-2">Vui lòng đợi trong giây lát</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-vibrant-red to-pure-black bg-clip-text text-transparent">
              Dashboard Quản lý Blog
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-warm-gray">
                Xin chào, <span className="font-semibold text-pure-black">{user?.email}</span>
              </p>
              <span className="text-xs px-2 py-1 bg-pure-black text-pure-white rounded-full">
                Quản trị viên
              </span>
            </div>
            <p className="text-sm text-warm-gray mt-1">
              Cập nhật lúc: {new Date().toLocaleString('vi-VN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
            onClick={() => {
              setSelectedPost(null)
              setShowForm(true)
            }} 
            className="mr-2 gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-md"
          >
            <Plus className="w-4 h-4" />
            Tạo bài viết mới
          </Button>
            <Button onClick={logout} variant="outline" className="gap-2 border-gray-300">
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-100 rounded-xl">
                  <BookOpen className="h-6 w-6 text-red-600" />
                </div>
                <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                  {((stats.totalPublished / stats.totalPosts) * 100 || 0).toFixed(0)}% hoàn thành
                </span>
              </div>
              <h3 className="text-3xl font-bold text-pure-white mb-1">{stats.totalPosts}</h3>
              <p className="text-pure-white font-medium">Tổng bài viết</p>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>Đã công khai: {stats.totalPublished}</span>
                  <span>Bản nháp: {stats.totalDrafts}</span>
                </div>
                <Progress value={(stats.totalPublished / stats.totalPosts) * 100 || 0} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-100 rounded-xl">
                  <Eye className="h-6 w-6 text-red-600" />
                </div>
                <TrendingUp className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="text-3xl font-bold text-pure-white mb-1">{formatNumber(stats.totalViews)}</h3>
              <p className="text-pure-white font-medium">Tổng lượt xem</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-300">
                <Clock className="h-4 w-4" />
                <span>Trung bình: {stats.avgViews} lượt/bài</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-100 rounded-xl">
                  <BarChart className="h-6 w-6 text-red-600" />
                </div>
                <Badge variant="outline" className="text-red-600 bg-red-50">
                  {categories.length} danh mục
                </Badge>
              </div>
              <h3 className="text-3xl font-bold text-pure-white mb-1">{stats.topCategory}</h3>
              <p className="text-pure-white font-medium">Danh mục phổ biến</p>
              <div className="mt-4">
                <p className="text-sm text-gray-300">
                  {categories.length > 0 ? (
                    `${categories[0].count} bài viết`
                  ) : (
                    "Chưa có bài viết"
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  stats.recentActivity > 0 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {stats.recentActivity > 0 ? 'Đang hoạt động' : 'Không có hoạt động'}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-pure-white mb-1">{stats.recentActivity}</h3>
              <p className="text-pure-white font-medium">Hoạt động 7 ngày</p>
              <div className="mt-4">
                <p className="text-sm text-gray-300">
                  {stats.recentActivity > 0 
                    ? `Có ${stats.recentActivity} bài viết mới` 
                    : 'Chưa có bài viết mới'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Posts */}
          <Card className="lg:col-span-2 border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <BookOpen className="h-5 w-5 text-red-600" />
                    Bài viết gần đây
                  </CardTitle>
                  <CardDescription>
                    {recentPosts.length} bài viết mới nhất được cập nhật
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2 text-vibrant-red hover:text-red-700 hover:bg-red-50"
                  onClick={() => window.location.href = '/admin/blog'}
                >
                  Xem tất cả
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {recentPosts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Chưa có bài viết nào</h3>
                  <p className="text-gray-500 mb-6">Hãy tạo bài viết đầu tiên của bạn</p>
                  <Button 
                    onClick={() => window.location.href = '/admin/blog/new'} 
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Tạo bài viết mới
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {recentPosts.map((post, index) => (
                    <div key={post.id} className="p-4 transition-colors duration-150">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium text-pure-white truncate">{post.title}</h4>
                            <span 
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold pointer-events-none ${post.status === 'published' ? 'bg-red-600 text-white' : 'bg-red-400 text-white'}`}
                            >
                              {post.status === 'published' ? 'Công khai' : 'Nháp'}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-300">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {post.date || new Date(post.created_at).toLocaleDateString('vi-VN')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3 " />
                              {post.views || 0} lượt xem
                            </span>
                            <span className="px-2 py-0.5 bg-gray-700 rounded text-xs">
                              {post.category}
                            </span>
                            <span className="text-xs text-gray-300">
                              {getTimeAgo(post.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Popular Posts & Categories */}
          <div className="space-y-6">
            {/* Popular Posts */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-vibrant-red" />
                  Bài viết phổ biến
                </CardTitle>
                <CardDescription>
                  Top {popularPosts.length} bài viết được xem nhiều nhất
                </CardDescription>
              </CardHeader>
              <CardContent>
                {popularPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">Chưa có lượt xem nào</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                      <div key={post.id} className="flex items-center gap-3 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                          <span className="font-bold text-red-600 text-sm">{index + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-pure-white truncate">{post.title}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {post.views?.toLocaleString() || 0}
                            </span>
                            <span>•</span>
                            <span>{post.category}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 ">
                  <FileText className="h-5 w-5 text-vibrant-red" />
                  Phân loại danh mục
                </CardTitle>
                <CardDescription>
                  {categories.length} danh mục bài viết
                </CardDescription>
              </CardHeader>
              <CardContent>
                {categories.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">Chưa có danh mục nào</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {categories.map((category, index) => {
                      const percentage = (category.count / stats.totalPosts) * 100
                      return (
                        <div key={index} className="space-y-2 ">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-pure-white">{category.name}</span>
                            <span className="text-sm font-semibold text-gray-300">{category.count} bài</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-300">
                            <span>{percentage.toFixed(1)}%</span>
                            <span>{category.count} / {stats.totalPosts} bài viết</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
      {/* Thêm Dialog form cho tạo bài viết */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedPost ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
            </DialogTitle>
          </DialogHeader>

          <BlogForm
            post={selectedPost}
            onSuccess={() => {
              setShowForm(false)
              fetchDashboardData()
            }}
          />
        </DialogContent>
      </Dialog>

    </div>
  )
}