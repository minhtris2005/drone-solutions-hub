import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Document } from '@/types/document'
import { supabase } from '@/services/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Upload, File as FileIcon, Calendar } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DocumentFormProps {
  document?: Document | null
  onSuccess: () => void
}

const categories = [
  'Kỹ thuật',
  'Pháp lý',
  'Sản phẩm',
  'Đào tạo',
  'Giá cả',
  'Hướng dẫn',
]

export const DocumentForm: React.FC<DocumentFormProps> = ({ document, onSuccess }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState<Document>({
    title: document?.title || '',
    description: document?.description || '',
    file_url: document?.file_url || '',
    category: document?.category || categories[0],
    status: document?.status || 'draft',
    date: document?.date || new Date().toISOString().split('T')[0], // Thêm ngày mặc định
  })

  const handleFileUpload = async (file: File) => {
    if (!user) {
      alert('Vui lòng đăng nhập để upload file')
      return
    }
    try {
      setUploading(true)
      
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${fileName}`

      const { data, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Upload error details:', uploadError)
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath)

      const fileNameDisplay = file.name
      const fileSizeDisplay = formatFileSize(file.size)
      const fileTypeDisplay = file.type || file.name.split('.').pop()?.toUpperCase()

      setFormData({ 
        ...formData, 
        file_url: publicUrl,
        file_name: fileNameDisplay,
        file_size: fileSizeDisplay,
        file_type: fileTypeDisplay
      })
    } catch (error) {
      console.error('Error uploading file:', error)
      alert(`Có lỗi khi tải lên file. Vui lòng kiểm tra console để biết chi tiết.`)
    } finally {
      setUploading(false)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const docData = {
        ...formData,
        user_id: user?.id,
        author: user?.email || 'Unknown',
      }

      if (document?.id) {
        const { error } = await supabase
          .from('documents')
          .update(docData)
          .eq('id', document.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('documents')
          .insert([docData])

        if (error) throw error
      }

      onSuccess()
    } catch (error) {
      console.error('Error saving document:', error)
      alert('Có lỗi xảy ra khi lưu tài liệu: ' + error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Tiêu đề *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Danh mục *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái *</Label>
            <Select
              value={formData.status}
              onValueChange={(value: 'published' | 'draft') => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Công khai</SelectItem>
                <SelectItem value="draft">Nháp</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Ngày đăng</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Mô tả *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">File tài liệu *</Label>
          
          {formData.file_url ? (
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <FileIcon className="w-5 h-5 mr-3 text-blue-500" />
                <div>
                  <p className="font-medium">File đã tải lên</p>
                  <p className="text-sm text-gray-500 truncate max-w-md">
                    {formData.file_name || formData.file_url}
                  </p>
                  {formData.file_size && (
                    <p className="text-xs text-gray-400">{formData.file_size}</p>
                  )}
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setFormData({ ...formData, file_url: '' })}
              >
                Xóa
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                id="file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    if (file.size > 10 * 1024 * 1024) {
                      alert('File quá lớn. Kích thước tối đa là 10MB')
                      return
                    }
                    handleFileUpload(file)
                  }
                }}
              />
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <Label
                htmlFor="file"
                className="cursor-pointer text-primary hover:underline"
              >
                Chọn file để tải lên
              </Label>
              <p className="text-sm text-gray-500 mt-2">
                PDF, DOC, DOCX, PPT, XLS (tối đa 10MB)
              </p>
              {uploading && (
                <p className="text-sm text-blue-500 mt-2">Đang tải lên...</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Hủy
        </Button>
        <Button type="submit" disabled={loading || !formData.file_url}>
          {loading ? 'Đang lưu...' : document?.id ? 'Cập nhật' : 'Tạo tài liệu'}
        </Button>
      </div>
    </form>
  )
}