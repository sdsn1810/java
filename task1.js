import java.util.ArrayList;
import java.util.List;

public class PowerOfTwoMaxHeap {
    private List<Integer> heap;
    private final int numChildren;

    // Constructor for the heap
    public PowerOfTwoMaxHeap(int numChildrenPower) {
        this.heap = new ArrayList<>();
        this.numChildren = (int) Math.pow(2, numChildrenPower);
    }

    // Insert a new element into the heap
    public void insert(int value) {
        heap.add(value);
        heapifyUp(heap.size() - 1);
    }

    // Remove and return the maximum element from the heap
    public int popMax() {
        if (heap.isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }
        int max = heap.get(0);
        int lastElement = heap.remove(heap.size() - 1);
        
        if (!heap.isEmpty()) {
            heap.set(0, lastElement);
            heapifyDown(0);
        }
        return max;
    }

    // Heapify up to maintain max-heap property
    private void heapifyUp(int index) {
        int parentIndex = getParentIndex(index);
        while (index > 0 && heap.get(index) > heap.get(parentIndex)) {
            swap(index, parentIndex);
            index = parentIndex;
            parentIndex = getParentIndex(index);
        }
    }

    // Heapify down to maintain max-heap property
    private void heapifyDown(int index) {
        while (true) {
            int largest = index;
            for (int i = 1; i <= numChildren; i++) {
                int childIndex = getChildIndex(index, i);
                if (childIndex < heap.size() && heap.get(childIndex) > heap.get(largest)) {
                    largest = childIndex;
                }
            }
            if (largest == index) break;
            swap(index, largest);
            index = largest;
        }
    }

    // Helper to get the parent index
    private int getParentIndex(int index) {
        return (index - 1) / numChildren;
    }

    // Helper to get the i-th child index
    private int getChildIndex(int index, int childNumber) {
        return numChildren * index + childNumber;
    }

    // Helper to swap elements in the heap list
    private void swap(int index1, int index2) {
        int temp = heap.get(index1);
        heap.set(index1, heap.get(index2));
        heap.set(index2, temp);
    }

    // Optional: method to get the size of the heap
    public int size() {
        return heap.size();
    }
}