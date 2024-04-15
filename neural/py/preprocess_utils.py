import csv
import pandas as pd
import numpy as np

def getTrainingData():
    pairs = []
    trdata = pd.read_csv(r"neural/py/mnist_train.csv", header=None)
    tdata = pd.read_csv(r"neural/py/mnist_test.csv", header=None)

    newTrData = []
    newTData = []
    for index, row in trdata.iterrows():
        answer = row[0]
        imageData = np.array(row[1:], dtype=np.uint8).reshape(-1,1)
        imageData = imageData / 255.0
        oneHot = np.zeros((10, 1))
        oneHot[answer] = 1.0
        newTrData.append((imageData, oneHot))

    for index, row in tdata.iterrows():
        answer = row[0]
        imageData = np.array(row[1:], dtype=np.uint8).reshape(-1,1)
        imageData = imageData / 255.0
        oneHot = np.zeros((10, 1))
        oneHot[answer] = 1.0
        newTData.append((imageData, oneHot))

    return newTData, newTrData